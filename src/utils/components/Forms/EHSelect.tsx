import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IEHSelect {
  name: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  sx?: SxProps;
  options: { label: string; value: string }[];
}

const EHSelect = ({
  name,
  label,
  fullWidth,
  sx,
  options,
  size = "small",
}: IEHSelect) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth={fullWidth} sx={sx} error={!!error?.message}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            labelId={`${name}-label`}
            label={label}
            error={!!error?.message}
            size={size}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {!!error?.message && (
            <Typography
              sx={{
                textAlign: "start",
                fontSize: "small",
                color: "#D32F2F",
                pl: "10px",
              }}
            >
              {error.message}
            </Typography>
          )}
        </FormControl>
      )}
    />
  );
};

export default EHSelect;
