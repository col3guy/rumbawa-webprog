import React from 'react';
import { Typography, Card, CardContent, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
 
function ReportsPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
 
      {/* Summary Cards */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Monthly Sales</Typography>
            <Typography variant="h4">₱120,000</Typography>
          </CardContent>
        </Card>
 
        <Card>
          <CardContent>
            <Typography variant="h6">New Users</Typography>
            <Typography variant="h4">320</Typography>
          </CardContent>
        </Card>
      </Stack>
 
      {/* Charts */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <BarChart
          series={[
            { data: [12000, 15000, 18000, 20000], label: 'Revenue' },
          ]}
          height={300}
          xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr'], scaleType: 'band' }]}
        />
 
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 40, label: 'Mobile' },
                { id: 1, value: 35, label: 'Desktop' },
                { id: 2, value: 25, label: 'Tablet' },
              ],
            },
          ]}
          width={300}
          height={300}
        />
      </Stack>
    </>
  );
}
 
export default ReportsPage;