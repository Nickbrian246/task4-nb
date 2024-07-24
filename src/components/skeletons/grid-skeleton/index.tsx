import React from "react";
import { Box, Skeleton, SxProps, Theme } from "@mui/material";

interface Props {
  rows?: number;
  sx?: SxProps<Theme>;
}
export default function GridSkeleton({ rows }: Props) {
  const groupOfRows = Array(rows ?? 30).fill("*");
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {groupOfRows.map((_, index) => (
        <Skeleton key={index} animation="wave" />
      ))}
    </Box>
  );
}
