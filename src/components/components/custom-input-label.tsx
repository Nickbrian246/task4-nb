import { InputLabel, InputLabelProps } from "@mui/material";
import { colors, text } from "@/constants";
interface Props extends InputLabelProps {
  children: string;
}
export function CustomInputLabel({ children, ...props }: Props) {
  return (
    <InputLabel
      {...props}
      style={{
        fontSize: text.textSm,
        color: colors.textBlue,
      }}
    >
      {children}
    </InputLabel>
  );
}
