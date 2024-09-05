import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Tooltip } from "@mui/material";

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 400, height: 600 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <DeleteIcon />
          </IconButton>
        }
        title={data.name}
        subheader={dayjs(data.dateTime).format("MMM D, YYYY")} //dayjs(data.dateTime).format('MMM D, YYYY')
      />
      <CardMedia
        component="img"
        height="194"
        sx={{ height: "300px" }}
        image={data.images[0].imageUrl}
        alt="Events"
      />
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
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                From: {dayjs(data.dateTime).format("hh:mm a")}
              </Typography>
            </Box>
          </Box>
          <Typography>
            {data.description.length > 70
              ? `${data?.description.slice(0, 70)}...`
              : data?.description}
          </Typography>

          <Typography my="5px">
            {data?.type === "CONCERT" ? (
              <Typography variant="body1">
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
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Edit Event">
          <EditIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
