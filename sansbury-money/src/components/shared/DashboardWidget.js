import React from "react";
import { Heading, Box } from "grommet";

function DashboardWidget({ children, title, color, basis }) {
  return (
    <Box basis={basis} pad="small">
      <Box
        color={color || "light-2"}
        elevation="small"
        style={{ fontFamily: "Alegreya" }}
        direction="row"
        round
      >
        <Box pad="small" fill>
          <Heading margin="none" level={1}>
            {title}
          </Heading>
          <Box>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardWidget;
