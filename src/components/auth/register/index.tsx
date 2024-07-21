"use client";
import {
  CustomButton,
  CustomInputLabel,
  CustomLink,
  CustomText,
  CustomTextField,
} from "@/components/components";
import { Box, List, ListItem } from "@mui/material";

export default function Register() {
  return (
    <Box
      sx={{
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <CustomText
        textSize="titleLg"
        textColor="black"
        style={{ fontWeight: "bold", textAlign: "center" }}
      >
        Register
      </CustomText>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <CustomInputLabel htmlFor="NameField">Name</CustomInputLabel>
          <CustomTextField id="NameField" placeholder="example: Andrew" />
        </Box>
        <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <CustomInputLabel htmlFor="EmailField">Email</CustomInputLabel>
          <CustomTextField id="EmailField" placeholder="example@example.com" />
        </Box>
        <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <CustomInputLabel htmlFor="passwordField">Password</CustomInputLabel>
          <CustomTextField id="passwordField" placeholder="Password" />
          <List component="div" sx={{ display: "flex " }}>
            <ListItem sx={{ padding: "0px" }}>
              <CustomText textSize="textSm" textColor="textBlue">
                * at least 1 character in password
              </CustomText>
            </ListItem>
          </List>
        </Box>

        <CustomButton variant="contained" textSize="textSm">
          Register
        </CustomButton>
      </form>
      <CustomLink href={"/"}>have an account?</CustomLink>
    </Box>
  );
}
