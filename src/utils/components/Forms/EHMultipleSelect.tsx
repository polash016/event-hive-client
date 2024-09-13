// import * as React from "react";
// import { Theme, useTheme } from "@mui/material/styles";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { FieldValues, useFormContext } from "react-hook-form";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name: string, personName: string[], theme: Theme) {
//   return {
//     fontWeight: personName.includes(name)
//       ? theme.typography.fontWeightMedium
//       : theme.typography.fontWeightRegular,
//   };
// }

// export default function EHMultipleSelect({
//   data,
//   isLoading,
//   value,
//   setValue,
// }: {
//   data: any;
//   isLoading: boolean;
//   value: string[];
//   setValue: React.Dispatch<React.SetStateAction<string[]>>;
// }) {
//   const theme = useTheme();

//   const { control, formState } = useFormContext();
//   const isError = formState.errors[name] !== undefined;

//   const handleChange = (event: FieldValues) => {
//     const {
//       target: { value },
//     } = event;
//     setValue(
//       // On autofill we get a stringified value.
//       typeof value === "string" ? value.split(",") : value
//     );
//   };

//   return (
//     <FormControl sx={{ m: 1, width: 300 }} size="small">
//       <InputLabel id="demo-multiple-name-label">Name</InputLabel>
//       <Select
//         // Removed the extra closing bracket here
//         labelId="demo-multiple-name-label"
//         id="demo-multiple-name"
//         multiple
//         value={value}
//         onChange={handleChange}
//         input={<OutlinedInput label="Name" />}
//         MenuProps={MenuProps}
//       >
//         {data?.map((data: any) => (
//           <MenuItem
//             disabled={isLoading}
//             key={data.id}
//             value={data.id}
//             style={getStyles(data?.name, value, theme)}
//           >
//             {data.name}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }

// <Controller
//   control={control}
//   name={name}
//   render={({
//     field: { onChange: fieldOnChange, ...field },
//     fieldState: { error },
//   }) => (
//     <TextField
//       {...field}
//       fullWidth={fullWidth}
//       sx={sx}
//       error={!!error?.message}
//       label={label}
//       select
//       required={required}
//       disabled={disabled}
//       size={size}
//       helperText={isError ? (formState.errors[name]?.message as string) : ""}
//       onChange={(e) => {
//         fieldOnChange(e);
//         if (onChange) {
//           onChange(e.target.value);
//         }
//       }}
//     >
//       {options.map((name) => (
//         <MenuItem key={name} defaultValue={defaultValue} value={name}>
//           {name}
//         </MenuItem>
//       ))}
//     </TextField>
//   )}
// />;

import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Controller, useFormContext } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function EHMultipleSelect({
  name,
  label,
  data,
  isLoading,
  defaultValue = [], // Added default value
  size = "small",
  fullWidth = true,
}: {
  name: string;
  label: string;
  data: any;
  isLoading: boolean;
  defaultValue?: string[];
  size?: "small" | "medium";
  fullWidth?: boolean;
}) {
  const theme = useTheme();
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error },
        ...field
      }) => (
        <FormControl size={size} fullWidth={fullWidth}>
          <InputLabel>{label}</InputLabel>
          <Select
            multiple
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            input={<OutlinedInput label={label} />}
            MenuProps={MenuProps}
            error={isError} // Added error prop for styling
          >
            {data?.map((data: any) => (
              <MenuItem
                disabled={isLoading}
                key={data.id}
                value={data.id}
                // style={getStyles(data?.name, value, field?.theme)}
              >
                {data.name || data.category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
