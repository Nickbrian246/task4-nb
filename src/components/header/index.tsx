"use client";
import { Box, Button, List, ListItem } from "@mui/material";
import { colors } from "@/constants";
import { CustomText } from "../components";
import { navListNoUser } from "./utils/nav-list";
import ComputerIcon from "@mui/icons-material/Computer";
import Link from "next/link";
import { useAuthUserContext } from "@/hooks/auth-user-context/use-auth-user-context";
import LogoutIcon from "@mui/icons-material/Logout";
import DialogActionStatus from "../table/components/user-actions-buttons/dialog-action-status";
import { useGlobalWarningContext } from "@/hooks/global-warning-context/global-warning-context";
import { useEffect } from "react";

export function Header() {
  const { isUserLoggedIn, logOutUser, getUserName } = useAuthUserContext();
  const { isActive, globalWarning, desActiveGlobalWarning } =
    useGlobalWarningContext();

  useEffect(() => {
    if (isActive)
      setTimeout(() => {
        desActiveGlobalWarning();
      }, 4000);
  }, [isActive, desActiveGlobalWarning]);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "5px",
        borderBottom: `1px solid ${colors.border}`,
        maxHeight: "50px",
        position: "relative",
      }}
    >
      <DialogActionStatus
        sx={{ bottom: "-100px" }}
        isOpen={isActive}
        message={globalWarning.message}
        close={() => {}}
        severity={globalWarning.severity}
      />
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <CustomText
          textColor="black"
          textSize="textLg"
          style={{ fontWeight: "bold" }}
        >
          NbDev
        </CustomText>
        <ComputerIcon />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isUserLoggedIn && (
          <CustomText
            textColor="black"
            textSize="textSm"
            sx={{ display: "flex", gap: "5px", alignItems: "center" }}
          >
            hello,{" "}
            <span>
              <CustomText textColor="textBlue" textSize="textMd">
                {getUserName() ?? "Error in getting name"}
              </CustomText>
            </span>
          </CustomText>
        )}
        <List component="nav" sx={{ display: "flex" }}>
          {!isUserLoggedIn &&
            navListNoUser.map((link) => (
              <ListItem
                key={link.id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Link
                  href={link.link}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <p style={{ fontWeight: 500, color: "black" }}>Register</p>
                </Link>
              </ListItem>
            ))}
          {isUserLoggedIn && (
            <Button
              onClick={() => {
                logOutUser();
              }}
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              <CustomText textSize="textSm" textColor="blue">
                log out
              </CustomText>
              <LogoutIcon sx={{ color: colors.textBlue }} />
            </Button>
          )}
        </List>
      </Box>
    </header>
  );
}
