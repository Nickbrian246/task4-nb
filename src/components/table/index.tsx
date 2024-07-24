"use client";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { User } from "@prisma/client";
import DialogActionStatus from "./components/user-actions-buttons/dialog-action-status";
import { colors, text } from "@/constants";

interface Props {
  users: User[];
  handleSelectionChange: (id: any) => void;
  selectedRows: any[];
  isLoadingAction: boolean;
}
const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "position", headerName: "Position", width: 150 },
  { field: "email", headerName: "E-Mail", width: 200 },
  { field: "lastLogin", headerName: "Last login", width: 180 },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
];
export default function UsersTable({
  handleSelectionChange,
  users,
  selectedRows,
  isLoadingAction,
}: Props) {
  return (
    <div
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <DataGrid
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={selectedRows}
        rows={users}
        columns={columns}
        checkboxSelection
        loading={isLoadingAction}
      />
    </div>
  );
}
