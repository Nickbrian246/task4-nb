"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { users } from "@/utils";
const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "position", headerName: "Position", width: 150 },
  { field: "email", headerName: "E-Mail", width: 200 },
  { field: "lastLogIn", headerName: "Last login", width: 180 },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (params.value === "active" ? "Active" : "Blocked"),
  },
];
export default function UsersTable() {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={users} columns={columns} checkboxSelection />
    </div>
  );
}
