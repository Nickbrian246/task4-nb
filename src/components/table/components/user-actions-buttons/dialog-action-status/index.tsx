import { Box, SxProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import { colors } from "@/constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";

type Severity = "success" | "error";
export interface DialogProps {
  message: string;
  severity: Severity;
  duration?: number;
}
interface Props {
  severity: Severity;
  message: string;
  duration?: number;
  isOpen: boolean;
  close: () => void;
  sx?: SxProps;
}

export default function DialogActionStatus({
  duration,
  message,
  severity,
  close,
  isOpen,
  sx,
}: Props) {
  useEffect(() => {
    const delay = duration ?? 1300;
    if (isOpen)
      setTimeout(() => {
        close();
      }, delay);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "4",
            ...sx,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              background: colors.main,
              border: `2px solid ${colors.border}`,
              padding: "30px",
              borderRadius: "10px",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {severity === "success" ? (
              <CheckCircleIcon sx={{ fontSize: "30px" }} color="success" />
            ) : (
              <WarningIcon sx={{ fontSize: "30px" }} color="warning" />
            )}
            {message}
          </Box>
        </Box>
      )}
    </>
  );
}
