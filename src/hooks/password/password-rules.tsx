import { useState } from "react";

export function usePasswordRules() {
  const [isDirty, setIsDirty] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);

  const validatePassword = (password: string) => {
    setHasMinLength(password.length > 1);
  };

  return {
    hasMinLength,
    isDirty,
    validatePassword,
    setIsDirty,
  };
}
