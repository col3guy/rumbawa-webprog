import { useState } from 'react';
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
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json?raw';
import EditIcon from '@mui/icons-material/Edit';

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

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? '').trim(),
        lastName: String(user.lastName ?? '').trim(),
        age: String(user.age ?? '').trim(),
        gender: genders.includes(
          String(user.gender ?? '').trim().toLowerCase()
        )
          ? String(user.gender ?? '').trim().toLowerCase()
          : '',
        contactNumber: String(user.contactNumber ?? '').trim(),
        email: String(user.email ?? '').trim().toLowerCase(),
        role: roles.includes(String(user.role ?? '').trim().toLowerCase())
          ? String(user.role ?? '').trim().toLowerCase()
          : 'editor',
        username: String(user.username ?? '').trim().toLowerCase(),
        password: String(user.password ?? ''),
        address: String(user.address ?? '').trim(),
        isActive:
          typeof user.isActive === 'boolean' ? user.isActive : true,
      })),
      error: '',
    };
  } catch {
    return {
      users: [],
      error: 'Unable to read users from src/assets/users.json.',
    };
  }
};

const seed = loadUsers();

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [users, setUsers] = useState(seed.users);
  const [search, setSearch] = useState('');

  // ✅ ENHANCEMENT 2: Filter state
  const [filterRole, setFilterRole] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
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

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // ✅ ENHANCEMENT 3: Improved validation
  const validate = () => {
    const nextErrors = {};

    [
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
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    const age = String(form.age ?? '').trim();
    const contact = String(form.contactNumber ?? '').trim();
    const username = String(form.username ?? '');
    const password = String(form.password ?? '');

    // Age must be numbers only
    if (age && !/^\d+$/.test(age)) {
      nextErrors.age = 'Age must be a number only.';
    }

    // Contact number must be exactly 11 digits
    if (contact && !/^\d{11}$/.test(contact)) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }

    // Password must be at least 8 characters
    if (password && password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    // Username must not contain spaces
    if (username && /\s/.test(username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
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

    setUsers((prev) =>
      modal.id
        ? prev.map((user) =>
          user.id === modal.id ? { ...user, ...nextUser } : user
        )
        : [
          ...prev,
          {
            id:
              prev.reduce(
                (max, user) => Math.max(max, Number(user.id) || 0),
                0
              ) + 1,
            ...nextUser,
          },
        ]
    );

    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  // ✅ ENHANCEMENT 2: Filter + search combined
  const filteredUsers = users.filter((user) => {
    const q = search.toLowerCase();

    const matchesSearch =
      !q ||
      user.firstName?.toLowerCase().includes(q) ||
      user.lastName?.toLowerCase().includes(q) ||
      user.username?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q) ||
      user.role?.toLowerCase().includes(q) ||
      user.contactNumber?.toLowerCase().includes(q);

    const matchesRole = !filterRole || user.role === filterRole;
    const matchesGender = !filterGender || user.gender === filterGender;
    const matchesStatus =
      filterStatus === '' ||
      (filterStatus === 'active' && user.isActive) ||
      (filterStatus === 'inactive' && !user.isActive);

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 120,
      valueGetter: (_, row) => labelize(row.role),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      renderCell: (row) => (
        <Chip
          size="small"
          label={row.row.isActive ? 'Active' : 'Inactive'}
          color={row.row.isActive ? 'success' : 'default'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 200,
      renderCell: (row) => {
        const isActive = row.row.isActive;
        return (
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', py: 0.5 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton size="small" color="primary" onClick={() => openModal(row.row)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <Button
                size="small"
                variant="contained"
                color={isActive ? 'error' : 'success'}
                onClick={() => toggleStatus(row.row.id)}
                sx={{
                  borderRadius: '50px',
                  textTransform: 'none',
                  px: 1.5,
                  py: 0.4,
                  fontSize: '0.72rem',
                  minWidth: 'unset',
                }}
              >
                {isActive ? 'Disable' : 'Enable'}
              </Button>
            </Stack>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>

      {/* HEADER */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h4">Users</Typography>
        <TextField
          size="small"
          placeholder="Search by name, email, username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: '100%', sm: 380 }, flexGrow: 1 }}
        />
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Add User
        </Button>
      </Box>

      {/* ✅ ENHANCEMENT 2: FILTER DROPDOWNS */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          select
          size="small"
          label="Role"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Roles</MenuItem>
          {roles.map((r) => (
            <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Gender"
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Genders</MenuItem>
          {genders.map((g) => (
            <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Stack>

      {/* TABLE */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%' }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            sx={{
              '& .MuiDataGrid-cell': {
                display: 'flex',
                alignItems: 'center',
                py: 1,
              },
            }}
          />
        </Box>
      </Paper>

      {/* MODAL */}
      <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField {...fieldProps('firstName', 'First Name')} />
              <TextField {...fieldProps('lastName', 'Last Name')} />
              <TextField
                {...fieldProps('age', 'Age')}
                inputProps={{ inputMode: 'numeric' }}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setForm((prev) => ({ ...prev, age: value }));
                  if (errors.age) setErrors((prev) => ({ ...prev, age: '' }));
                }}
              />
              <TextField select {...fieldProps('gender', 'Gender')}>
                {genders.map((g) => (
                  <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>
                ))}
              </TextField>
              <TextField
                {...fieldProps('contactNumber', 'Contact Number')}
                inputProps={{ inputMode: 'numeric', maxLength: 11 }}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setForm((prev) => ({ ...prev, contactNumber: value }));
                  if (errors.contactNumber) setErrors((prev) => ({ ...prev, contactNumber: '' }));
                }}
              />
              <TextField {...fieldProps('email', 'Email')} />
              <TextField
                {...fieldProps('username', 'Username')}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, '');
                  setForm((prev) => ({ ...prev, username: value }));
                  if (errors.username) setErrors((prev) => ({ ...prev, username: '' }));
                }}
              />
              <TextField
                {...fieldProps('password', 'Password')}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField {...fieldProps('address', 'Address')} />
              <TextField select {...fieldProps('role', 'Role')}>
                {roles.map((r) => (
                  <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;