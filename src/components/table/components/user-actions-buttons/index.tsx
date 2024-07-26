"use client";
import React, { SetStateAction } from "react";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { User } from "@prisma/client";
import { blockUsers, deleteUsers, unLockUsers } from "./services";
import { DialogProps } from "./dialog-action-status";
import { ApiFailureResponse } from "@/types/api";
import { useRouter } from "next/navigation";
import { useAuthUserContext } from "@/hooks/auth-user-context/use-auth-user-context";
import { useGlobalWarningContext } from "@/hooks/global-warning-context/global-warning-context";
import { localUser } from "@/utils/date-adapter";
import { usersDateAdapter } from "@/utils/date-adapter";
interface Props {
  isDisable: boolean;
  setUsers: React.Dispatch<SetStateAction<localUser[]>>;
  usersSelected: any[];
  handleSelectionChange: (id: any[]) => void;
  setIsLoadingAction: React.Dispatch<SetStateAction<boolean>>;
  setDialogProps: React.Dispatch<SetStateAction<DialogProps>>;
  setOpenActionStatusDialog: React.Dispatch<SetStateAction<boolean>>;
}

export default function UserActionButtons({
  isDisable,
  setUsers,
  usersSelected,
  handleSelectionChange,
  setIsLoadingAction,
  setDialogProps,
  setOpenActionStatusDialog,
}: Props) {
  const router = useRouter();
  const { logOutUser } = useAuthUserContext();
  const { activeGlobalWarning } = useGlobalWarningContext();

  const handleBlockUsers = async () => {
    try {
      const token = localStorage.getItem("access_token");
      setIsLoadingAction(true);

      if (!token) return router.replace("/auth/login");

      const res = await blockUsers(token, usersSelected);
      setUsers(usersDateAdapter(res.data));
      handleSelectionChange([]);
      setOpenActionStatusDialog(true);
      setDialogProps({
        message: "Users blocked successfully",
        severity: "success",
      });
      setIsLoadingAction(false);
    } catch (error) {
      const err = error as ApiFailureResponse;
      if (err.message === "UserBlocked") {
        activeGlobalWarning(
          "You are not authorized to perform this action because your account is blocked.",
          "error"
        );

        logOutUser();
        return router.replace("/auth/login");
      }
      if (err.message === "No User found") {
        activeGlobalWarning(
          "You are not authorized to perform this action because your account has been deleted.",
          "error"
        );
        logOutUser();
        return router.replace("/auth/register");
      }
      setOpenActionStatusDialog(true);
      setIsLoadingAction(false);
      setDialogProps({
        message: err.message,
        severity: "error",
        duration: 5000,
      });
    }
  };

  const handleUnLockUsers = () => {
    const token = localStorage.getItem("access_token");
    setIsLoadingAction(true);
    if (token)
      unLockUsers(token, usersSelected)
        .then((res) => {
          setUsers(usersDateAdapter(res.data));
          handleSelectionChange([]);
          setIsLoadingAction(false);
          setOpenActionStatusDialog(true);
          setDialogProps({
            message: "Users unlocked  successfully",
            severity: "success",
          });
        })
        .catch((err) => {
          const error = err as ApiFailureResponse;
          if (err.message === "UserBlocked") {
            activeGlobalWarning(
              "You are not authorized to perform this action because your account is blocked.",
              "error"
            );
            logOutUser();
            return router.replace("/auth/login");
          }
          if (err.message === "No User found") {
            activeGlobalWarning(
              "You are not authorized to perform this action because your account has been deleted.",
              "error"
            );
            logOutUser();
            return router.replace("/auth/register");
          }
          setOpenActionStatusDialog(true);
          setIsLoadingAction(false);
          setDialogProps({
            message: error.message,
            severity: "error",
            duration: 5000,
          });
        })
        .finally(() => {
          setIsLoadingAction(false);
        });
  };

  const handleDeleteUsers = () => {
    const token = localStorage.getItem("access_token");
    setIsLoadingAction(true);
    if (token)
      deleteUsers(token, usersSelected)
        .then((res) => {
          if (res.data.length === 0) {
            activeGlobalWarning("Your account has been deleted.", "error");
            logOutUser();
            return;
          }
          setUsers(usersDateAdapter(res.data));
          handleSelectionChange([]);
          setIsLoadingAction(false);
          setOpenActionStatusDialog(true);
          setDialogProps({
            message: "Users deleted successfully",
            severity: "success",
          });
        })
        .catch((err) => {
          const error = err as ApiFailureResponse;
          if (err.message === "UserBlocked") {
            activeGlobalWarning(
              "You are not authorized to perform this action because your account is blocked.",
              "error"
            );
            logOutUser();
            return router.replace("/auth/login");
          }
          if (err.message === "No User found") {
            activeGlobalWarning(
              "You are not authorized to perform this action because your account has been deleted.",
              "error"
            );
            logOutUser();
            return router.replace("/auth/register");
          }
          setOpenActionStatusDialog(true);
          setIsLoadingAction(false);
          setDialogProps({
            message: error.message,
            severity: "error",
            duration: 5000,
          });
        })
        .finally(() => {
          setIsLoadingAction(false);
        });
  };

  return (
    <>
      <Button
        onClick={handleBlockUsers}
        disabled={isDisable}
        title="Block users"
        variant="contained"
      >
        <LockIcon />
        Block
      </Button>
      <Button
        onClick={handleUnLockUsers}
        disabled={isDisable}
        title="un lock users"
        variant="contained"
        color="success"
      >
        <LockOpenIcon />
      </Button>
      <Button
        onClick={handleDeleteUsers}
        disabled={isDisable}
        title="Delete users"
        variant="contained"
        color="error"
      >
        <DeleteForeverIcon />
      </Button>
    </>
  );
}
