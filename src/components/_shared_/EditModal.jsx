import React from "react";
// noinspection ES6CheckImport
import PropTypes from "prop-types";

import {Box, TextInput, Calendar, Heading} from "grommet";
import {Dialog} from "./Dialog";
import Input from "./Input";

const EditModal = ({object, onClose, update, fields}) => {

    if (!object) return <div/>;

    return (
        <Dialog onClose={onClose} open={!!object}>
            {/* Name Header */}
            <TextInput
                plain
                style={{fontFamily: "Alegreya", fontSize: "24pt"}}
                value={object.name}
                placeholder="Name"
                onChange={update("name")}
            />

            <Box flex={"grow"} direction={"row-responsive"} wrap style={{width: "100%"}}>
                {fields.map(field => {
                    let full = false;
                    let fieldElement = <Box direction={"column"}>
                        <Input
                            name={field.name}
                            value={object[field.property]}
                            onChange={update(field.property)}
                        />
                    </Box>;

                    if (field.type === 'date') {
                        full = true;
                        fieldElement = <Box>
                            <Heading level={4} margin={"none"} style={{fontFamily: "Lato"}}>
                                {field.name}
                            </Heading>
                            <Calendar
                                margin={{top: "small"}}
                                style={{fontFamily: "Roboto"}}
                                size="small"
                                date={object[field.property]}
                                onSelect={date => update(field.property)({target: {value: date}})}
                            />
                        </Box>
                    }

                    return <Box basis={full ? "100%": "1/2"} pad={"small"}>
                        {fieldElement}
                    </Box>
                })}
            </Box>
        </Dialog>
    );
};

EditModal.propTypes = {
    transaction: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired
};

export default EditModal;
