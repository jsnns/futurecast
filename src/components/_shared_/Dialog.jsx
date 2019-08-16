import React from "react";
import {Box} from "grommet/es6";
import {Modal} from "react-bootstrap";
import {Button} from "grommet";

export const Dialog = ({children, open, onClose}) => {
    return <Box margin={{
        top: "medium",
        bottom: "medium",
        left: "xlarge",
        right: "xlarge"
    }}>
        <Modal show={open} onHide={onClose} variant={"dark"} bg={"dark"}>
            <Modal.Body>
                <Box
                    gap="small"
                >
                    {children}
                    <Button onClick={onClose} label={"Done"} title={"Done"} style={{color: "black"}} />
                </Box>
            </Modal.Body>
        </Modal>
    </Box>;
};