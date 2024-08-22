"use client";
import assets from "@/assets";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import CreateOrgModal from "../components/CreateOrgModal";
import { useGetAllOrganizerQuery } from "@/redux/api/organizerApi";

const CreateOrganizer = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetAllOrganizerQuery({});
  console.log(data);

  return (
    <Container>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Image
            style={{
              display: "block",
              margin: "0px auto",
            }}
            alt="logo"
            src={assets.logo.login_icon}
            width={100}
            height={100}
          ></Image>

          <Stack my={5} direction="row" justifyContent="space-between">
            <Box>
              <Button onClick={() => setOpen(!open)}>Create Organizer</Button>
              <CreateOrgModal open={open} setOpen={setOpen}></CreateOrgModal>
            </Box>
            <Box>
              <TextField size="small" placeholder="Search Here"></TextField>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
export default CreateOrganizer;
