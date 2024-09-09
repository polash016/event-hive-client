import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IEHInput {
  name: string;
  type?: string;
  required?: boolean;
  label: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  disabled?: boolean;
}

const EHInput = ({
  name,
  required,
  label,
  size = "small",
  fullWidth = true,
  type = "text",
  sx,
  placeholder,
  disabled = false,
}: IEHInput) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          required={required}
          placeholder={placeholder || label}
          type={type}
          label={label}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          sx={{ ...sx }}
          disabled={disabled}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default EHInput;
