import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

import initialArticles from "../../data/articles";

const getInitialRows = () => {
  const stored = JSON.parse(localStorage.getItem("articles"));

  if (!Array.isArray(stored) || stored.length !== initialArticles.length) {
    localStorage.setItem("articles", JSON.stringify(initialArticles));
    return initialArticles;
  }

  return stored;
};

export default function DashArticleListPage() {
  const [rows, setRows] = useState(getInitialRows);

  const toggleStatus = (id) => {
    setRows((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "published" || item.status === "active"
                  ? "draft"
                  : "published",
            }
          : item
      )
    );
  };

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 80,
        align: "center",
        headerAlign: "center",
      },

      {
        field: "slug",
        headerName: "Slug",
        flex: 1,
        minWidth: 180,
      },

      {
        field: "title",
        headerName: "Title",
        flex: 1.4,
        minWidth: 220,
        renderCell: (params) => (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {params.value}
          </Typography>
        ),
      },

      {
        field: "paragraphs",
        headerName: "Paragraphs",
        width: 130,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Chip
            label={params.row.paragraphs?.length || 0}
            size="small"
            variant="outlined"
          />
        ),
      },

      {
        field: "preview",
        headerName: "Preview",
        flex: 2,
        minWidth: 280,
        sortable: false,
        renderCell: (params) => (
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "text.secondary",
              width: "100%",
            }}
          >
            {params.value}
          </Typography>
        ),
      },

      {
        field: "status",
        headerName: "Status",
        width: 140,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const published = params.value === "published";

          return (
            <Chip
              label={published ? "Published" : "Draft"}
              size="small"
              color={published ? "success" : "default"}
              variant="filled"
            />
          );
        },
      },

      {
        field: "actions",
        headerName: "Actions",
        width: 170,
        sortable: false,
        align: "center",
        headerAlign: "center",

        renderCell: (params) => {
          const id = params.row.id;
          const active =
            params.row.status === "active";

          return (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              sx={{ width: "100%", height: "100%" }}
            >
              {/* EDIT */}
              <Tooltip title="Edit Article">
                <IconButton
                  component={Link}
                  to={`/dashboard/articles/${id}`}
                  color="primary"
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* TOGGLE STATUS */}
              <Tooltip
                title={
                  active
                    ? "Set as Inactive"
                    : "Set as Active"
                }
              >
                <IconButton
                  size="small"
                  onClick={() => toggleStatus(id)}
                  color={
                    active ? "warning" : "success"
                  }
                >
                  {active ? (
                    <ToggleOffIcon fontSize="small" />
                  ) : (
                    <ToggleOnIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Stack>
          );
        },
      },
    ],
    []
  );

  return (
    <Box sx={{ width: "100%", height: 560 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        sx={{
          border: 0,

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
          },

          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#fafafa",
          },
        }}
      />
    </Box>
  );
}