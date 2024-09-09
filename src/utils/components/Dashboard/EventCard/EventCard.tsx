import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Stack, Tooltip } from "@mui/material";
import Link from "next/link";
import ImageSlider from "../ImageSlider/ImageSlider";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function EventCard({ data }: { data: any }) {
  const [expanded, setExpanded] = React.useState(false);
  console.log(data);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 400, height: 600, my: 2 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <DeleteIcon
              color="inherit"
              sx={{
                ":hover": {
                  color: "red",
                },
              }}
            />
          </IconButton>
        }
        title={
          <Typography fontSize={16} fontWeight={700}>
            {data.name}
          </Typography>
        }
        subheader={
          <Typography fontSize={14}>
            {dayjs(data.dateTime).format("MMM D, YYYY")}
          </Typography>
        } //dayjs(data.dateTime).format('MMM D, YYYY')
      />

      <ImageSlider
        sx={{ height: "300px" }}
        images={data.images}
        interval={5000}
      />
      {/* <CardMedia
        component="img"
        image={data.images[0].imageUrl}
        alt="Events"
      /> */}
      <CardContent>
        <Box height={100}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "0.5px",
                overflow: "hidden",
                my: "2px",
              }}
            >
              <LocationOnIcon
                sx={{ color: "text.secondary", fontSize: "small" }}
              />
              <Tooltip title={data?.location?.street || ""}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary", fontSize: "small" }}
                >
                  {data?.location?.street.slice(0, 6)},
                </Typography>
              </Tooltip>

              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", fontSize: "small" }}
              >
                {data?.location?.city}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", fontSize: "small" }}
              >
                From: {dayjs(data.dateTime).format("hh:mm a")}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography fontSize={15}>
              {data.description.length > 70
                ? `${data?.description.slice(0, 70)}...`
                : data?.description}
            </Typography>

            <Typography my="5px">
              {data?.type === "CONCERT" ? (
                <Typography fontSize={15} variant="body1">
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      fontStyle: "revert",
                      marginRight: "4px",
                    }}
                  >
                    Artist:
                  </Typography>
                  {data?.artist?.name}
                </Typography>
              ) : (
                <Typography variant="body1">
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      fontStyle: "revert",
                      marginRight: "4px",
                    }}
                  >
                    Speaker:
                  </Typography>
                  {data?.speaker?.name}
                </Typography>
              )}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <Stack direction="row">
        <Link href={`/dashboard/organizer/event/edit/${data.id}`}>
          <IconButton aria-label="Edit Event" sx={{ marginLeft: "10px" }}>
            <EditIcon
              sx={{
                ":hover": {
                  color: "sandybrown",
                },
              }}
            />
          </IconButton>
        </Link>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </Stack>
    </Card>
  );
}
