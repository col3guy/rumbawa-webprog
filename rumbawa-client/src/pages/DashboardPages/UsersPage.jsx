import React from 'react';
import { Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
 
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Role', width: 150 },
];
 
const rows = [
  { id: 1, firstName: 'Juan', lastName: 'Dela Cruz', email: 'juan@email.com', role: 'Admin' },
  { id: 2, firstName: 'Maria', lastName: 'Santos', email: 'maria@email.com', role: 'User' },
  { id: 3, firstName: 'Pedro', lastName: 'Reyes', email: 'pedro@email.com', role: 'User' },
  { id: 4, firstName: 'Ana', lastName: 'Lopez', email: 'ana@email.com', role: 'Manager' },
  { id: 5, firstName: 'Mark', lastName: 'Cruz', email: 'mark@email.com', role: 'User' },
];
 
function UsersPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
 
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </>
  );
}
 
export default UsersPage;