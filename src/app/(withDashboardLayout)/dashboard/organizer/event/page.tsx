"use client";
import assets from "@/assets";
import {
  useDeleteEventMutation,
  useGetAllEventQuery,
} from "@/redux/api/eventApi";
import { useDebounced } from "@/redux/hooks";
import { Box, Container, Grid, Stack, TextField } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import CreateEventModal from "./components/CreateEventModal";
import EHButton from "@/utils/components/ui/EHButton";
import EventCard from "@/utils/components/Dashboard/EventCard/EventCard";

const OrganizerPage = () => {
  const [open, setOpen] = useState(false);
  const [deleteAdmin] = useDeleteEventMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const query: Record<string, any> = {};

  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data: dataObj, isLoading, error } = useGetAllEventQuery({ ...query });

  const data = dataObj?.data;

  const handleDelete = (id: string) => {
    const res = deleteAdmin(id).unwrap();

    // dayjs(date).format("hh:mm a")

    toast.promise(res, {
      loading: "Deleting...",
      success: (res: any) => {
        if (res?.data?.id) {
          return res.message || "Admin Deleted Successfully";
        } else {
          return res.message;
        }
      },
      error: (error: any) => {
        console.log(error);
        return error?.message || "Delete failed";
      },
    });
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 250, flex: 1 },
    { field: "email", headerName: "Email", width: 250, flex: 2 },
    { field: "contactNumber", headerName: "Contact", width: 250, flex: 1 },
    {
      field: `delete`,
      headerName: "Delete",
      align: "center",
      headerAlign: "center",
      width: 250,
      renderCell: ({ row }) => {
        return (
          <button onClick={() => handleDelete(row.id)}>
            <GridDeleteIcon color="error" />
          </button>
        );
      },
      flex: 1,
    },
  ];

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
              <EHButton title="Create Event" onClick={() => setOpen(!open)} />

              <CreateEventModal
                open={open}
                setOpen={setOpen}
              ></CreateEventModal>
            </Box>
            <Box>
              <TextField
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                placeholder="Search Here"
              ></TextField>
            </Box>
          </Stack>
          <Grid
            container
            spacing={4}
            my={1}
            alignItems="center"
            justifyContent="start"
          >
            {!isLoading ? (
              data?.map((event: any) => {
                return (
                  <Grid key={event.id} item sm={6} md={6} lg={4}>
                    <EventCard data={event} />
                  </Grid>
                );
              })
            ) : (
              // <CircularProgress color="success" />
              <h1>Loading.....</h1>
            )}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};
export default OrganizerPage;
