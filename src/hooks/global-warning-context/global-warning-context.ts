import {
  GlobalWarningContextType,
  GlobalWarning,
} from "@/context/global-warning/global-warning";
import { useContext } from "react";
export function useGlobalWarningContext(): GlobalWarningContextType {
  const globalWarning = useContext(GlobalWarning);
  if (!globalWarning) {
    throw new Error(
      "useAuthUserContext must be used inside an AuthUser.Provider."
    );
  }
  return globalWarning;
}
