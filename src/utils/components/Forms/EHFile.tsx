import {
  FormControl,
  SxProps,
  Typography,
  Stack,
  Input,
  Button,
  Box,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";

interface IEHSelect {
  name: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
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

const EHFile = ({ name, label, fullWidth, sx, size = "small" }: IEHSelect) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        <Box
          component="label"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid gray",
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "border-color 0.2s",
            "&:hover": {
              borderColor: "rgba(0, 0, 0, 0.87)",
            },
          }}
        >
          <CloudUploadIcon sx={{ marginRight: "8px" }} />
          <Typography variant="body2" component="span">
            {label || "Upload File"}
          </Typography>
          <Input
            {...field}
            size={size}
            value={value?.fileName}
            type={name}
            onChange={(e) =>
              onChange((e.target as HTMLInputElement).files?.[0])
            }
            sx={{ display: "none" }}
          />
        </Box>
        // <Button
        //   fullWidth
        //   component="label"
        //   role={undefined}
        //   variant="contained"
        //   tabIndex={-1}
        //   startIcon={<CloudUploadIcon />}
        //   sx={{ ...sx }}
        // >
        //   {label || "Upload File"}
        //   <Input
        //     {...field}
        //     size={size}
        //     value={value?.fileName}
        //     type={name}
        //     onChange={(e) => console.log(e.target.files)}
        //     sx={{ display: "none" }}
        //   />
        // </Button>
      )}
    />
  );
};

export default EHFile;
