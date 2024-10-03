"use client";

import assets from "@/assets";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/api/categoryApi";
import EHForm from "@/utils/components/Forms/EHForm";
import EHInput from "@/utils/components/Forms/EHInput";
import EHModal from "@/utils/components/Shared/EHModal/EHModal";
import EHButton from "@/utils/components/ui/EHButton";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const categoryValidation = z.object({
  name: z
    .string()
    .min(1, "Please enter category name")
    .regex(/^[A-Z]/, "Category name must start with a capital letter"),
});

const defaultValues = {
  name: "",
};

const Category = () => {
  const [open, setOpen] = useState(false);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const query: Record<string, any> = {};

  const { data: dataObj, isLoading } = useGetCategoriesQuery({});

  const data = dataObj?.data;

  const handleDelete = (id: string) => {
    const res = deleteCategory(id).unwrap();

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

  const handleCreateCategory = (value: FieldValues) => {
    const res = createCategory(value).unwrap();

    // dayjs(date).format("hh:mm a")

    toast.promise(res, {
      loading: "Creating...",
      success: (res: any) => {
        console.log(res);
        if (res?.data?.id) {
          setOpen(false);
          return res.message || "Category Created Successfully";
        } else {
          return res.message;
        }
      },
      error: (error: any) => {
        console.log(error);
        return error?.message || "Category create failed";
      },
    });
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 250 },
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
              <EHButton
                title="Create Category"
                onClick={() => setOpen(!open)}
              />

              <EHModal title="Create Category" open={open} setOpen={setOpen}>
                <EHForm
                  onSubmit={handleCreateCategory}
                  resolver={zodResolver(categoryValidation)}
                  defaultValues={defaultValues}
                >
                  <Grid
                    container
                    spacing={4}
                    my={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item md={12} sm={12}>
                      <EHInput
                        fullWidth={true}
                        name="name"
                        label="Category Name"
                      />
                    </Grid>
                  </Grid>

                  <EHButton
                    icon={true}
                    title="Submit"
                    type="submit"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mx: "auto",
                      my: 4,
                    }}
                  />
                </EHForm>
              </EHModal>
            </Box>
            <Box></Box>
          </Stack>
          <Grid
            container
            spacing={4}
            my={1}
            alignItems="center"
            justifyContent="start"
          >
            {!isLoading ? (
              <Box sx={{ display: "block", mx: "auto", width: "400px" }}>
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
                  hideFooter
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
              <Typography sx={{ display: "block", mx: "auto" }}>
                {/* <CircularProgress color="success" /> */}
                Loading.....
              </Typography>
            )}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};
export default Category;
