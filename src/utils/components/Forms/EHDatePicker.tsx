import { Controller, useFormContext } from "react-hook-form";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { SxProps } from "@mui/material";
import dayjs from "dayjs";
import { useFormState } from "react-dom";

interface IProps {
  name: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  sx?: SxProps;
  defaultValue?: string;
}

const EHDatePicker = ({
  name,
  label,
  required = true,
  fullWidth = true,
  size = "small",
  sx,
  defaultValue,
}: IProps) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={
        defaultValue
          ? dayjs(new Date(defaultValue).toDateString())
          : dayjs(new Date().toDateString())
      }
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              {...field}
              timezone="system"
              disablePast
              onChange={(time) => onChange(time)}
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
export default EHDatePicker;
