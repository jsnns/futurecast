import React from "react";
import PropTypes from "prop-types";

import { Box, Heading, TextInput } from "grommet";
import { Dialog } from "../_shared_/Dialog";

const EditModal = ({ object, onClose, update, fields }) => {

  if (!object) return <div/>;

  return (
    <Dialog onClose={onClose} open={!!object}>
      <Box pad="small">

        {/* Name Header */}
        <TextInput
          plain
          style={{ fontFamily: "Alegreya", fontSize: "24pt" }}
          value={object.name}
          placeholder="Name"
          onChange={update("name")}
        />

        <Box flex={"grow"} gap={"small"}>
          {fields.map(field => {
            return <div>
              <Heading level={4} margin={"none"}>
                {field.name}
              </Heading>
              <TextInput
                value={object[field.property]}
                placeholder={field.name}
                onChange={update(field.property)}
              />
            </div>
          })}
        </Box>

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
