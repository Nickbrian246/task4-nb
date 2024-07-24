"use client";
import { createContext, useEffect, useState } from "react";

type Severity = "success" | "error";

export type GlobalWarningProps = {
  message: string;
  severity: Severity;
};

export type GlobalWarningContextType = {
  activeGlobalWarning: (message: string, severity: Severity) => void;
  isActive: boolean;
  globalWarning: GlobalWarningProps;
  desActiveGlobalWarning: () => void;
};

export const GlobalWarning = createContext<
  GlobalWarningContextType | undefined
>(undefined);

export function GlobalWarningProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [globalWarning, setGlobalWarning] = useState<GlobalWarningProps>({
    message: "",
    severity: "success",
  });
  const [isActive, setIsActive] = useState<boolean>(false);

  const activeGlobalWarning = (message: string, severity: Severity) => {
    setGlobalWarning({
      message,
      severity,
    });
    setIsActive(true);
  };

  const desActiveGlobalWarning = () => {
    setIsActive(false);
    setGlobalWarning({
      message: "",
      severity: "success",
    });
  };

  return (
    <GlobalWarning.Provider
      value={{
        activeGlobalWarning,
        isActive,
        globalWarning,
        desActiveGlobalWarning,
      }}
    >
      {children}
    </GlobalWarning.Provider>
  );
}
