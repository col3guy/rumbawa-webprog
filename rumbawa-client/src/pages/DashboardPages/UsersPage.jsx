import { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser, deleteUser } from "../../services/userServices.js";
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';

const usersSeed = [];

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

// ── Component ──────────────────────────────────────────────────────────────────
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState({ open: false, id: null });

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [navigate]);
  const [form, setForm] = useState({ ...blankForm });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchUsers();
        setUsers(res.data);
      } catch (err) {
        console.warn('Could not fetch users from API:', err.message);
      } finally {
        setLoadingUsers(false);
      }
    })();
  }, []);

  // ── Search & filter state ──────────────────────────────────────────────────
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // ── Derived filtered rows ─────────────────────────────────────────────────
  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q);

    const matchRole = !filterRole || u.role === filterRole;
    const matchGender = !filterGender || u.gender === filterGender;
    const matchStatus =
      filterStatus === ''
        ? true
        : filterStatus === 'active'
        ? u.isActive
        : !u.isActive;

    return matchSearch && matchRole && matchGender && matchStatus;
  });

  // ── Helpers ───────────────────────────────────────────────────────────────
  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user = null) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // ── Validation (Enhancement 3) ────────────────────────────────────────────
  const validate = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const requiredFields = [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['password', 'Password'],
      ['address', 'Address'],
    ];

    requiredFields.forEach(([key, label]) => {
      if (!form[key]) nextErrors[key] = `${label} is required.`;
    });

    if (form.age && !/^\d+$/.test(form.age))
      nextErrors.age = 'Age must be a number only.';

    if (form.contactNumber && !/^\d{11}$/.test(form.contactNumber))
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';

    if (form.email && !emailRegex.test(form.email))
      nextErrors.email = 'Enter a valid email address.';

    if (
      form.email &&
      users.some(
        (u) => u.id !== modal.id && u.email === form.email
      )
    )
      nextErrors.email = 'Email address already exists.';

    if (form.username && /\s/.test(form.username))
      nextErrors.username = 'Username must not contain spaces.';

    if (
      form.username &&
      users.some(
        (u) => u.id !== modal.id && u.username === form.username
      )
    )
      nextErrors.username = 'Username already exists.';

    if (form.password && form.password.length < 8)
      nextErrors.password = 'Password must be at least 8 characters.';

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const newUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
    };

    // If editing existing user — persist to server
    if (modal.id) {
      (async () => {
        try {
          const res = await updateUser(modal.id, newUser);
          const updated = res.data;
          setUsers((prev) => prev.map((u) => (u.id === modal.id ? { ...u, ...updated } : u)));
          closeModal();
        } catch (err) {
          console.error(err);
          alert((err.response && err.response.data && err.response.data.message) || 'Failed to update user');
        }
      })();
      return;
    }

    // Create on server
    (async () => {
      try {
        const res = await createUser(newUser);
        const created = res.data;
        // append created user to local state
        setUsers((prev) => [
          ...prev,
          created,
        ]);
        closeModal();
      } catch (err) {
        console.error(err);
        alert((err.response && err.response.data && err.response.data.message) || 'Failed to create user');
      }
    })();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  // ── fieldProps helper ─────────────────────────────────────────────────────
  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    size: 'small',
    ...extra,
  });

  // ── DataGrid columns ──────────────────────────────────────────────────────
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 180,
      valueGetter: (_, row) =>
        `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', width: 140 },
    { field: 'age', headerName: 'Age', width: 70 },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 100,
      valueFormatter: (_, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', width: 140 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 190 },
    {
      field: 'role',
      headerName: 'Role',
      width: 110,
      valueFormatter: (_, row) => labelize(row.role),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 110,
      sortable: false,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.row.isActive ? 'Active' : 'Inactive'}
          color={params.row.isActive ? 'success' : 'default'}
          variant={params.row.isActive ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 190,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => openModal(params.row)}
            sx={{ borderRadius: '20px', fontSize: '0.7rem', py: '2px', px: '10px', minWidth: 0 }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={params.row.isActive ? 'warning' : 'success'}
            onClick={() => toggleStatus(params.row.id)}
            sx={{ borderRadius: '20px', fontSize: '0.7rem', py: '2px', px: '10px', minWidth: 0 }}
          >
            {params.row.isActive ? 'Disable' : 'Activate'}
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={async () => {
              if (!confirm('Delete this user?')) return;
              try {
                await deleteUser(params.row.id);
                setUsers((prev) => prev.filter((u) => u.id !== params.row.id));
              } catch (err) {
                console.error(err);
                alert('Failed to delete user');
              }
            }}
            sx={{ borderRadius: '20px', fontSize: '0.7rem', py: '2px', px: '10px', minWidth: 0 }}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* Page Header */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h4">Users</Typography>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Add User
        </Button>
      </Box>

      {/* Search & Filter Bar (Enhancement 2) */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 2, flexWrap: 'wrap' }}
      >
        <TextField
          size="small"
          placeholder="Search by name, email, or username…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 2, minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          size="small"
          label="Role"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="">All Roles</MenuItem>
          {roles.map((r) => (
            <MenuItem key={r} value={r}>
              {labelize(r)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Gender"
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="">All Genders</MenuItem>
          {genders.map((g) => (
            <MenuItem key={g} value={g}>
              {labelize(g)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Stack>

      {/* Data Table */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        {loadingUsers ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : users.length ? (
          <Box sx={{ height: 460, sm: 520, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                  outline: 'none',
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No users found. Use Add User to create your first record.
          </Alert>
        )}
      </Paper>

      {/* Add / Edit Dialog */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <DialogTitle>
            {modal.id ? 'Edit User' : 'Add User'}
          </DialogTitle>

          <DialogContent dividers sx={{ pt: 2, pb: 2 }}>
            <Stack spacing={2} sx={{ pt: 1 }}>

              {/* Row 1 — Name */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>

              {/* Row 2 — Age & Gender */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField
                  {...fieldProps('gender', 'Gender', { select: true })}
                >
                  {genders.map((g) => (
                    <MenuItem key={g} value={g}>
                      {labelize(g)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              {/* Row 3 — Contact & Email */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('contactNumber', 'Contact Number')} />
                <TextField
                  {...fieldProps('email', 'Email Address', { type: 'email' })}
                />
              </Stack>

              {/* Row 4 — Role & Username */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  {...fieldProps('role', 'Role', { select: true })}
                >
                  {roles.map((r) => (
                    <MenuItem key={r} value={r}>
                      {labelize(r)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>

              {/* Password */}
              <TextField
                {...fieldProps('password', 'Password')}
                type={showPassword ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(event) => event.preventDefault()}
                          aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                          }
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Address */}
              <TextField
                {...fieldProps('address', 'Address', {
                  multiline: true,
                  rows: 2,
                })}
              />

              {/* Active Toggle */}
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={`User status: ${form.isActive ? 'Active' : 'Inactive'}`}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;