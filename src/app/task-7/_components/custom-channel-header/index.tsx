import { Box } from "@mui/material";
import React from "react";
import { ChannelHeader } from "stream-chat-react";
import ChannelDropDownMenu from "./components/chennelOptionsMenu";
export default function CustomChannelHeader() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <ChannelHeader />
      <ChannelDropDownMenu />
    </Box>
  );
}
