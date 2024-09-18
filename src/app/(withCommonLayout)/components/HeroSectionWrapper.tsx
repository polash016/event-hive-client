// import HeroSection2 from "@/utils/components/HeroSection.tsx/HeroContainer";
// import { Box } from "@mui/material";

// const HeroSectionWrapper = () => {
//   return (
//     <Box>
//       <HeroSection2></HeroSection2>
//     </Box>
//   );
// };
// export default HeroSectionWrapper;

import { motion } from "framer-motion";

const HeroSectionWrapper = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ width: 100, height: 100, backgroundColor: "red" }}
    >
      Test Motion
    </motion.div>
  );
};

export default HeroSectionWrapper;
