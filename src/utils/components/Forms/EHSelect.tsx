import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  SelectChangeEvent,
  Typography,
  TextField,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IEHSelect {
  name: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  sx?: SxProps;
  options: string[];
  onChange?: (value: string) => void;
  defaultValue?: string;
}

const EHSelect = ({
  name,
  label,
  fullWidth,
  sx,
  options,
  size = "small",
  required = true,
  onChange,
  defaultValue,
}: IEHSelect) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange: fieldOnChange, ...field },
        fieldState: { error },
      }) => (
        <TextField
          {...field}
          fullWidth={fullWidth}
          sx={sx}
          error={!!error?.message}
          label={label}
          select
          required={required}
          size={size}
          helperText={
            isError ? (formState.errors[name]?.message as string) : ""
          }
          onChange={(e) => {
            fieldOnChange(e);
            if (onChange) {
              onChange(e.target.value);
            }
          }}
        >
          {options.map((name) => (
            <MenuItem key={name} defaultValue={defaultValue} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default EHSelect;
