"use client";
import assets from "@/assets";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { useDeleteAdminMutation } from "@/redux/api/adminApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from "@/redux/hooks";
import {
  useGetAllUsersQuery,
  useUpdateStatusMutation,
} from "@/redux/api/userApi";

const ManageUsers = () => {
  const [open, setOpen] = useState(false);
  const [updateStatus] = useUpdateStatusMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const query: Record<string, any> = {};

  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading, error } = useGetAllUsersQuery({ ...query });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  const handleDelete = (data: any) => {
    const updateData = {
      id: data.id,
      status: data.status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
    };
    const res = updateStatus(updateData).unwrap();

    toast.promise(res, {
      loading: "Updating...",
      success: (res: any) => {
        if (res?.id) {
          return res.message || "User Status Updated Successfully";
        } else {
          return res.message;
        }
      },
      error: (error: any) => {
        console.log(error);
        return error?.message || "Update failed";
      },
    });
  };

  console.log(data);

  //   const role = (data?.data?.role).toLowerCase();

  const getUserData = (data: any) => {
    // Check for nested user data under different properties
    if (data?.admin) {
      return data.admin;
    } else if (data?.organizer) {
      return data.organizer;
    } else if (data?.attendee) {
      return data.attendee;
    } else {
      // Handle potential fallback if user data structure is unknown
      console.warn("Unknown user data structure:", data);
      return {};
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: ({ row }) => {
        const userData = getUserData(row);
        return <Box>{userData.name}</Box>;
      },
      flex: 1,
    },
    { field: "email", headerName: "Email", width: 250, flex: 2 },
    {
      field: `contactNumber`,
      headerName: "Contact",
      width: 250,
      renderCell: ({ row }) => {
        const userData = getUserData(row);
        return <Box>{userData.contactNumber}</Box>;
      },
      flex: 1,
    },
    {
      field: `Block`,
      headerName: "Block",
      align: "center",
      headerAlign: "center",
      width: 250,
      renderCell: ({ row }) => {
        return (
          <Button
            size="small"
            // color={row.status === "ACTIVE" ? "red" : "purple"}
            sx={{
              background: row.status === "ACTIVE" ? "#FF0000" : "#00FF00",
              "&:hover": {
                background: row.status === "ACTIVE" ? "#FF6666" : "#66FF66",
              },
            }}
            onClick={() => handleDelete({ id: row.id, status: row.status })}
          >
            {row.status === "ACTIVE" ? "Block" : "Unblock"}
          </Button>
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

          <Stack my={5} direction="row" justifyContent="end">
            <Box>
              <TextField
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                placeholder="Search Here"
              ></TextField>
            </Box>
          </Stack>
          {!isLoading ? (
            <Box>
              <DataGrid
                rows={data.data}
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

export default ManageUsers;
