"use client";
import { Button, SxProps } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

interface ButtonProps {
  title: string;
  sx?: SxProps;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: any;
  component?: any;
  href?: string;
  icon?: boolean;
  disabled?: boolean;
}
const EHButton = ({
  title,
  sx,
  type,
  onClick,
  component,
  href,
  icon = false,
  disabled = false,
}: ButtonProps) => {
  return (
    <Button
      type={type}
      component={component}
      disabled={disabled}
      href={href}
      onClick={onClick}
      startIcon={icon && <SaveIcon />}
      sx={{
        background: "linear-gradient(90deg, #f857a6 0%, #ff5858 100%)",
        color: "white",
        "&:hover": {
          background: "linear-gradient(90deg, #ff5858 0%, #f857a6 100%)",
        },
        ...sx,
      }}
    >
      {title}
    </Button>
  );
};
export default EHButton;
