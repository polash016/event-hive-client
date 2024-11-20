"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Avatar,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/system";
import EHForm from "../../Forms/EHForm";
import EHInput from "../../Forms/EHInput";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import EHSelect from "../../Forms/EHSelect";
import { Gender } from "@/constants/common";
import { FieldValues } from "react-hook-form";
import EHFile from "../../Forms/EHFile";
import { modifyPayload } from "@/utils/modifyPayload";
import { toast } from "sonner";

const ProfileContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  maxWidth: "600px",
  margin: "0 auto",
});

const UserProfile = () => {
  const { data: profileData, isLoading } = useGetProfileQuery("");
  const [updateProfile] = useUpdateProfileMutation();
  const theme = useTheme();

  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const profile = profileData?.data;

  const defaultValues = {
    name: profile?.name || "",
    email: profile?.email || "",
    gender: profile?.gender || "",
    contactNumber: profile?.contactNumber || "",
    organizationName: profile?.organizationName || "",
    websiteUrl: profile?.websiteUrl || "",
    socialMediaUrl: profile?.socialMediaUrl || "",
    address: profile?.address || "",
  };

  const handleEditProfile = async (data: FieldValues) => {
    console.log(data);
    // setIsEditing(false);
    const formData = modifyPayload(data);
    const res = updateProfile(formData).unwrap();

    toast.promise(res, {
      loading: "Updating...",
      success: (res: any) => {
        if (res?.data?.id) {
          return res?.message || "Profile Updated successfully";
        } else {
          return res?.message;
        }
      },
      error: (error: any) => {
        console.log(error.message);
        return error?.message || "Something went wrong";
      },
    });
  };

  return (
    <ProfileContainer>
      <EHForm onSubmit={handleEditProfile} defaultValues={defaultValues}>
        <Box
          position="relative"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Avatar
            src={profile.profilePhoto || "/default-avatar.png"}
            alt={profile.name}
            sx={{ width: 150, height: 150, mb: 2 }}
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: 5,
              left: "60%",
              color: "white",
              transform: "translateX(-50%)",
            }}
            component="label"
          >
            <EditIcon />
            <EHFile name="file" label="Upload Profile Photo" hideInput={true} />
          </IconButton>
        </Box>
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            p: 4,
            boxShadow: 3,
            maxWidth: 600,
            mx: "auto",
            color: theme.palette.text.primary,
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Edit Profile
            </Typography>
            <IconButton
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              <EditIcon />
            </IconButton>
          </Box>

          {/* Form Section */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <EHInput
                fullWidth={true}
                name="name"
                label="Name"
                disabled={!isEditing}
                sx={{
                  input: { color: "white" },
                  label: { color: theme.palette.text.secondary },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: theme.palette.text.secondary },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <EHInput
                fullWidth={true}
                name="email"
                label="Email"
                disabled={true}
                sx={{
                  input: { color: "white" },
                  label: { color: theme.palette.text.secondary },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: theme.palette.text.secondary },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <EHSelect
                disabled={!isEditing}
                name="gender"
                label="Gender"
                fullWidth={true}
                options={Gender}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: theme.palette.text.secondary },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  color: "white",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <EHInput
                fullWidth={true}
                name="contactNumber"
                label="Contact Number"
                disabled={!isEditing}
                sx={{
                  input: { color: "white" },
                  label: { color: theme.palette.text.secondary },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: theme.palette.text.secondary },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <EHInput
                fullWidth={true}
                name="organizationName"
                label="Organization Name"
                disabled={!isEditing}
                sx={{
                  input: { color: "white" },
                  label: { color: theme.palette.text.secondary },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: theme.palette.text.secondary },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <EHInput
                fullWidth={true}
                name="websiteUrl"
                label="Website Url"
                disabled={!isEditing}
                sx={{
                  input: { color: "white" },
                  label: { color: theme.palette.text.secondary },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: theme.palette.text.secondary },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <EHInput
                fullWidth={true}
                name="socialMediaUrl"
                label="SocialMedia Url"
                disabled={!isEditing}
                sx={{
                  input: { color: "white" },
                  label: { color: theme.palette.text.secondary },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: theme.palette.text.secondary },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <EHInput
                fullWidth={true}
                name="address"
                label="Address"
                disabled={!isEditing}
                sx={{
                  input: { color: "white" },
                  label: { color: theme.palette.text.secondary },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: theme.palette.text.secondary },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Button
          startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          type="submit"
          sx={{
            mt: 2,
            display: "flex",
            mx: "auto",
            width: "full",
            backgroundColor: "#3a506b",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#5b7193",
            },
            padding: "7px 25px 7px 25px",
            transition: "background-color 0.3s",
          }}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </EHForm>
    </ProfileContainer>
  );
};

export default UserProfile;
