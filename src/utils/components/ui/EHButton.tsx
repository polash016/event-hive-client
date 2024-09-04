import { Button, SxProps } from "@mui/material";

interface ButtonProps {
  title: string;
  sx?: SxProps;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: any;
  component?: any;
  href?: any;
}
const EHButton = ({
  title,
  sx,
  type,
  onClick,
  component,
  href,
}: ButtonProps) => {
  return (
    <Button
      type={type}
      component={component}
      href={href}
      onClick={onClick}
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
