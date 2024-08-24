"use client";
import assets from "@/assets";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import CreateOrgModal from "../components/CreateOrgModal";
import {
  useDeleteOrganizerMutation,
  useGetAllOrganizerQuery,
} from "@/redux/api/organizerApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";

const CreateOrganizer = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetAllOrganizerQuery({});
  const [deleteOrganizer] = useDeleteOrganizerMutation();
  // const [pagination, setPagination] = useState({
  //   page: 0,
  //   pageSize: 5,
  // });

  // const handlePaginationChange = (newPagination: GridPaginationModel) => {
  //   setPagination(newPagination);
  // };

  const handleDelete = (id: string) => {
    const res = deleteOrganizer(id).unwrap();

    toast.promise(res, {
      loading: "Deleting...",
      success: (res: any) => {
        console.log(res);

        if (res?.id) {
          return res.message || "User Deleted Successfully";
        } else {
          return res.message;
        }
      },
      error: (error: any) => {
        console.log(error.message);
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
            <DeleteIcon color="error" />
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
              <Button onClick={() => setOpen(!open)}>Create Organizer</Button>
              <CreateOrgModal open={open} setOpen={setOpen}></CreateOrgModal>
            </Box>
            <Box>
              <TextField size="small" placeholder="Search Here"></TextField>
            </Box>
          </Stack>
          {!isLoading ? (
            <Box>
              <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                autoHeight
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f5f5f5",
                  },
                  "& .MuiDataGrid-cell": {
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                  },
                }}
              />
            </Box>
          ) : (
            // <CircularProgress color="success" />
            <h1>Loading.....</h1>
          )}
        </Box>
      </Stack>
    </Container>
  );
};
export default CreateOrganizer;
