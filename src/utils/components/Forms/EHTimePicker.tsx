import { Controller, useFormContext } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { SxProps } from "@mui/material";
import dayjs from "dayjs";

interface IProps {
  name: string;
  label: string;
  required: boolean;
  fullWidth: boolean;
  size: "small" | "medium";
  sx: SxProps;
}

const EHTimePicker = ({
  name,
  label,
  required = true,
  fullWidth = true,
  size = "small",
  sx,
}: IProps) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              {...field}
              timezone="system"
              disablePast
              onChange={(date) => onChange(date)}
              label={label}
              value={value || Date.now()}
              slotProps={{
                textField: {
                  required: required,
                  size: size,
                  sx: { ...sx },
                  variant: "outlined",
                  fullWidth: fullWidth,
                  helperText: isError
                    ? (formState.errors[name]?.message as string)
                    : "",
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};
export default EHTimePicker;
