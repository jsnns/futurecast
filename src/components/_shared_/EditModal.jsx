import React from "react";
// noinspection ES6CheckImport
import PropTypes from "prop-types";

import { Box, TextInput } from "grommet";
import { Dialog } from "./Dialog";
import Input from "./Input";

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
              <Input name={field.name} value={object[field.property]} onChange={update(field.property)}/>
            </div>;
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
