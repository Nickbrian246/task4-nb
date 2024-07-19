import {
  CustomButton,
  CustomInputLabel,
  CustomLink,
  CustomText,
  CustomTextField,
} from "@/components/components";
import { Box } from "@mui/material";

export default function Login() {
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
        textSize="titleEL"
        textColor="black"
        style={{ fontWeight: "bold" }}
      >
        Log in to your account
      </CustomText>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <CustomInputLabel htmlFor="EmailField">Email</CustomInputLabel>
          <CustomTextField id="EmailField" placeholder="example@example.com" />
        </Box>
        <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <CustomInputLabel htmlFor="passwordField">Password</CustomInputLabel>
          <CustomTextField id="passwordField" placeholder="Password" />
        </Box>
        <CustomButton variant="contained" textSize="textSm">
          Log in
        </CustomButton>
      </form>
      <CustomLink href={"/"}>Don&apos;t have an account?</CustomLink>
      <CustomLink href="/">Forgot your password?</CustomLink>
    </Box>
  );
}
