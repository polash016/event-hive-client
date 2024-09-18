// components/ImageSlider.jsx
import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, SxProps } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const ImageSlider = ({
  images,
  sx,
  interval = 3000,
}: {
  images: any;
  sx?: SxProps;
  interval?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(handleNext, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval, handleNext]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      width="100%"
      height="300px"
      overflow="hidden"
      sx={{ ...sx }}
    >
      {/* <Button
        onClick={handlePrev}
        variant="contained"
        style={{
          position: "absolute",
          left: "10px",
          zIndex: 1,
        }}
      >
        Prev
      </Button> */}
      <Image
        src={images[currentIndex]?.imageUrl || assets.images.no_images}
        alt={`Slide ${currentIndex + 1}`}
        layout="fill"
        objectFit="cover"
      />
      {/* <Button
        onClick={handleNext}
        variant="contained"
        style={{
          position: "absolute",
          right: "10px",
          zIndex: 1,
        }}
      >
        Next
      </Button> */}

      {/* Dots Indicators */}
      <Box
        display="flex"
        justifyContent="center"
        position="absolute"
        bottom="10px"
        width="100%"
        zIndex={1}
      >
        {images.map((_: null, index: number) => (
          <Box
            key={index}
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "gray" : "white",
              margin: "0 5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
