import React from "react";

import { useLocation } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge } from "@mui/x-charts/Gauge";

import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
} from "@mui/material";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

/* =======================
   LEAFLET FIX (IMPORTANT)
======================= */
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

/* =======================
   DATA
======================= */
const position = [14.604253, 120.994314];

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "age", headerName: "Age", width: 110 },
  {
    field: "fullName",
    headerName: "Full name",
    width: 160,
    sortable: false,
    valueGetter: (value, row) =>
      `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 4, lastName: "Targaryen", firstName: "Daenerys", age: 22 },
];

/* =======================
   COMPONENT
======================= */
export default function DashboardPage() {
  const location = useLocation(); // safe now (no crash risk)

  const validAges = rows.filter((r) => r.age !== null);
  const avgAge =
    validAges.length > 0
      ? validAges.reduce((a, b) => a + b.age, 0) / validAges.length
      : 0;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* SUMMARY */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography>Total Users</Typography>
            <Typography variant="h4">{rows.length}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography>Average Age</Typography>
            <Typography variant="h4">{avgAge.toFixed(1)}</Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* GAUGES */}
      <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
        <Gauge width={120} height={120} value={50} />
        <Gauge width={120} height={120} value={75} valueMin={10} valueMax={100} />
      </Stack>

      {/* CHARTS */}
      <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
        <BarChart
          series={[
            { data: [35, 44, 24, 34], label: "Series 1" },
            { data: [51, 6, 49, 30], label: "Series 2" },
          ]}
          height={250}
          xAxis={[
            { data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" },
          ]}
        />

        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "A" },
                { id: 1, value: 15, label: "B" },
                { id: 2, value: 20, label: "C" },
              ],
            },
          ]}
          width={250}
          height={250}
        />
      </Stack>

      {/* DATA GRID */}
      <Typography variant="h5" gutterBottom>
        Users Overview
      </Typography>

      <Box sx={{ height: 400, width: "100%", mb: 4 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
        />
      </Box>

      {/* MAP */}
      <Typography variant="h5" gutterBottom>
        Location Map
      </Typography>

      <Box sx={{ height: 500, width: "100%" }}>
        <div style={{ height: "100%", width: "100%" }}>
          <MapContainer
            center={position}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
              <Popup>
                <strong>National University Manila</strong>
                <br />
                551F Jhocson St, Sampaloc, Manila
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </Box>
    </Box>
  );
}