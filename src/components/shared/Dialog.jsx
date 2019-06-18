import React from "react";
import {Modal} from "@material-ui/core";
import {Box} from "grommet/es6";

export const Dialog = ({children, open, onClose}) => {
    return <Modal open={open} onClose={onClose}>
        <Box
            margin={{
                top: "medium",
                bottom: "medium",
                left: "xlarge",
                right: "xlarge"
            }}
            pad="small"
            background="light-2"
            elevation="large"
            gap="small"
        >
            {children}
        </Box>
    </Modal>
};