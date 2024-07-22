"use client";
import {
  CustomButton,
  CustomInputLabel,
  CustomLink,
  CustomText,
  CustomTextField,
  PasswordRules,
} from "@/components/components";
import { colors } from "@/constants";
import { usePasswordRules } from "@/hooks/password/password-rules";
import { RegisterUserType } from "@/validations/auth";
import { Box } from "@mui/material";
import { useState } from "react";
import { fields } from "./utils/fields";

export default function Register() {
  const [userData, setUserData] = useState<RegisterUserType>({
    email: "",
    name: "",
    password: "",
    position: "",
  });
  const [isHidePassword, setIsHidePassword] = useState(false);
  const { hasMinLength, isDirty, validatePassword, setIsDirty } =
    usePasswordRules();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name.toLowerCase();
    const value = e.target.value;
    if (name === "password") validatePassword(value);
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <Box
      sx={{
        minWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        border: `2px solid ${colors.border}`,
        borderRadius: "10px",
        padding: "50px",
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
        {fields.map((field) => (
          <Box
            key={field.htmlFor}
            sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
          >
            <CustomInputLabel htmlFor={field.htmlFor}>
              {field.name}
            </CustomInputLabel>
            <CustomTextField
              onChange={handleInput}
              value={
                userData[
                  `${field.name.toLowerCase()}` as keyof RegisterUserType
                ]
              }
              name={field.name}
              id={field.htmlFor}
              placeholder={field.placeholder}
            />
          </Box>
        ))}
        <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <CustomInputLabel htmlFor="passwordField">Password</CustomInputLabel>
          <CustomTextField
            onFocus={() => {
              validatePassword(userData["password"] as string);
              setIsDirty(true);
            }}
            name="password"
            onChange={handleInput}
            value={userData["password"]}
            id="passwordField"
            placeholder="Password"
          />
          <PasswordRules hasMinLength={hasMinLength} isDirty={isDirty} />
        </Box>

        <CustomButton
          disabled={!hasMinLength}
          variant="contained"
          textSize="textSm"
        >
          Register
        </CustomButton>
      </form>
      <CustomLink href={"/"}>have an account?</CustomLink>
    </Box>
  );
}
