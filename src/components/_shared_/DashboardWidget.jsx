import React from "react";
import { Box, Heading } from "grommet";

function DashboardWidget({ children, title, color, basis }) {
  return (
    <Box pad="small" direction="row" basis={basis}>
      <Box
        color={color || "light-2"}
        background={"dark-1"}
        pad={"small"}
        flex={"grow"}
        animation={{
          "type": "fadeIn",
          "delay": 100,
          "duration": 1000,
          "size": "xsmall"
        }}
      >
        <Heading style={{ fontFamily: "Alegreya" }} margin="none" level={1}>
          {title}
        </Heading>
        <Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardWidget;
