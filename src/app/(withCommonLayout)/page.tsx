import EventHomePage from "@/utils/components/EventHomePage/EventHomePage";
import HeroSection2 from "@/utils/components/HeroSection.tsx/HeroContainer";
import { Box } from "@mui/material";
import ReviewSection from "@/utils/components/EventHomePage/ReviewSection";
import WhyChooseUs from "./components/WhyUs";

export default function Home() {
  return (
    <>
      {/* <HeroSection></HeroSection> */}
      <HeroSection2></HeroSection2>
      <Box sx={{ width: "full", backgroundColor: "#141C2B" }}>
        <EventHomePage></EventHomePage>
      </Box>
      <ReviewSection></ReviewSection>
      <WhyChooseUs></WhyChooseUs>
    </>
  );
}
