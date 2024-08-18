import assets from "@/assets";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "600px",
        display: "block",
        backgroundImage: `url(https://res.cloudinary.com/daa4x7pfh/image/upload/v1723928191/pexels-wendywei-1540406_qtrges.jpg)`, // Use inline style for background
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          gap={8}
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            textAlign="center"
            variant="h5"
            component="h1"
            color="white"
            py={8}
          >
            Enjoy Various Event Exclusively. Lorem ipsum dolor sit <br /> amet
            consectetur adipisicing elit. Qui laudantium <br />
            necessitatibus magni asperiores error dolorum?
          </Typography>
          <Stack direction="row" gap={4}>
            <Button>Send Email</Button>
            <Button
              variant="outlined"
              sx={{
                background: "none",
              }}
            >
              Contact Us
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
export default HeroSection;
