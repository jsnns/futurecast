import React from "react";
import { Box } from "grommet/es6";

function DashboardSection({ children, basis, direction }) {
  return (
    <Box direction={direction} basis={basis}>
      {children}
    </Box>
  );
}

export default DashboardSection;
