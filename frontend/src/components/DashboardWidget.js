import React from "react";
import { Heading, Box } from "grommet";

function DashboardWidget({ children, title, color, basis }) {
  return (
    <Box
      color={color || "light-2"}
      elevation="small"
      style={{ fontFamily: "Alegreya" }}
      pad="small"
      direction="row"
      margin="small"
      basis={basis}
      round
    >
      <Box fill={false}>
        <Heading margin="small" level={1}>
          {title}
        </Heading>
        {children}
      </Box>
    </Box>
  );
}

export default DashboardWidget;
