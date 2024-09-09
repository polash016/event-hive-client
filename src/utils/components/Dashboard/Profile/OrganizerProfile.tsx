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

const OrganizerProfile = () => {
  const { data: profileData, isLoading } = useGetProfileQuery("");
  const [updateProfile] = useUpdateProfileMutation();

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
              bottom: -10,
              left: "58%",
              transform: "translateX(-50%)",
            }}
            component="label"
          >
            <EditIcon />
            <EHFile name="file" label="Upload Profile Photo" hideInput={true} />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
          <Typography variant="h5" gutterBottom>
            Edit Profile
          </Typography>

          <IconButton
            component="label"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            <EditIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <EHInput
              fullWidth={true}
              name="name"
              label="Name"
              disabled={!isEditing}
            />
            {/* <TextField
              fullWidth
              label="Name"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={!isEditing}
            /> */}
          </Grid>
          <Grid item xs={12}>
            <EHInput
              fullWidth={true}
              name="email"
              label="Email"
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <EHSelect
              disabled={!isEditing}
              name="gender"
              label="Gender"
              sx={{ width: "100%" }}
              fullWidth={true}
              options={Gender}
            />
          </Grid>
          <Grid item xs={12}>
            <EHInput
              fullWidth={true}
              name="contactNumber"
              label="Contact Number"
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <EHInput
              fullWidth={true}
              name="organizationName"
              label="Organization Name"
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <EHInput
              fullWidth={true}
              name="websiteUrl"
              label="Website Url"
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <EHInput
              fullWidth={true}
              name="socialMediaUrl"
              label="SocialMedia Url"
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <EHInput
              fullWidth={true}
              name="address"
              label="Address"
              disabled={!isEditing}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          type="submit"
          sx={{ mt: 2 }}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </EHForm>
    </ProfileContainer>
  );
};

export default OrganizerProfile;
