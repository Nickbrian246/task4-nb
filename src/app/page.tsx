"use client";
import UsersTable from "@/components/table";
import { Box } from "@mui/material";
import UserActionButtons from "@/components/table/components/user-actions-buttons";
import { getUsers } from "@/components/table/services";
import { User } from "@prisma/client";
import { useState, useEffect } from "react";
import GridSkeleton from "@/components/skeletons/grid-skeleton";
import DialogActionStatus from "@/components/table/components/user-actions-buttons/dialog-action-status";
import { DialogProps } from "@/components/table/components/user-actions-buttons/dialog-action-status";
import { useRouter } from "next/navigation";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState<boolean>(true);
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false);
  const [openActionStatusDialog, setOpenActionStatusDialog] =
    useState<boolean>(false);
  const router = useRouter();
  const [dialogProps, setDialogProps] = useState<DialogProps>({
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const name = localStorage.getItem("userName");
    setIsFetchingUsers(true);
    if (!token && !name) return router.replace("/auth/login");
    if (token)
      getUsers(token)
        .then((res) => res)
        .then((res) => setUsers(res.data))
        .finally(() => setIsFetchingUsers(false));
  }, [router]);

  const handleSelectionChange = (newSelection: any) => {
    setSelectedRows(newSelection);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "90vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex ",
          gap: "30px",
          flexDirection: "column",
          width: "1000px",
          position: "relative",
        }}
      >
        <DialogActionStatus
          isOpen={openActionStatusDialog}
          message={dialogProps.message}
          severity={dialogProps.severity}
          close={() => setOpenActionStatusDialog(false)}
        />
        <Box
          sx={{
            display: "flex",
            gap: "30px",
          }}
        >
          <UserActionButtons
            isDisable={selectedRows.length === 0}
            setUsers={setUsers}
            usersSelected={selectedRows}
            handleSelectionChange={handleSelectionChange}
            setIsLoadingAction={setIsLoadingAction}
            setDialogProps={setDialogProps}
            setOpenActionStatusDialog={setOpenActionStatusDialog}
          />
        </Box>
        {users?.length > 0 && (
          <UsersTable
            selectedRows={selectedRows}
            handleSelectionChange={handleSelectionChange}
            users={users}
            isLoadingAction={isLoadingAction}
          />
        )}
        {isFetchingUsers && <GridSkeleton />}
      </Box>
    </Box>
  );
}
