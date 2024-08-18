"use client";
import assets from "@/assets";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const Register = () => {
  const [gender, setGender] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };
  return (
    <Container
      sx={{
        padding: "50px",
      }}
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            bgcolor: "white",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box>
              <Image
                alt="logo"
                src={assets.logo.login_icon}
                width={100}
                height={100}
              ></Image>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={600} color="grey.800">
                User Registration
              </Typography>
            </Box>
          </Stack>
          <Box>
            <Grid container spacing={2} my={1}>
              <Grid item md={12}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Gender"
                    onChange={handleChange}
                  >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <Input type="file" hidden onChange={handleFileChange} />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Contact"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              sx={{
                display: "block",
                mx: "auto",
                my: 4,
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};
export default Register;
