import React from "react";
import { Heading, Box } from "grommet";

function DashboardWidget({ children, title, color, basis }) {
  return (
    <Box basis={basis} fill={false} flex="grow" pad="small">
      <Box
        color={color || "light-2"}
        elevation="small"
        style={{ fontFamily: "Alegreya" }}
        direction="row"
        round
      >
        <Box pad="small" basis="auto">
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
