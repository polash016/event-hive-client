import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  SelectChangeEvent,
  Typography,
  Box,
  Stack,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";

interface IEHSelect {
  name: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  size?: number;
  sx?: SxProps;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const EHFile = ({ name, label, fullWidth, sx, size }: IEHSelect) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          fullWidth={fullWidth}
          sx={{
            border: "1px solid black",
            width: "100%",
            p: "5px",
            borderRadius: "3px",
            borderColor: "gray",
            "&:hover": {
              borderColor: "rgba(0, 0, 0, 0.87)",
            },
          }}
          error={!!error?.message}
        >
          <Stack
            direction="row"
            gap={1}
            role={undefined}
            sx={{ cursor: "pointer" }}
          >
            <CloudUploadIcon />
            {label}
            <VisuallyHiddenInput {...field} size={size} type="file" />
          </Stack>

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

export default EHFile;
