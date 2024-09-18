import EventHomePage from "@/utils/components/EventHomePage/EventHomePage";
import HeroSection2 from "@/utils/components/HeroSection.tsx/HeroContainer";
import HeroSection from "@/utils/components/HeroSection.tsx/HeroSection";
import { Button } from "@mui/material";
import Image from "next/image";
import HeroSectionWrapper from "./components/HeroSectionWrapper";

export default function Home() {
  return (
    <>
      {/* <HeroSection></HeroSection> */}
      {/* <HeroSectionWrapper /> */}
      <HeroSection2></HeroSection2>
      <EventHomePage></EventHomePage>
    </>
  );
}
