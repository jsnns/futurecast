import React from "react";
import PropTypes from "prop-types";

import { Box, CheckBox, Heading, TextInput } from "grommet";
import { Dialog } from "../../shared/Dialog";

const EditSubscriptionModal = ({ onClose, edit, subscription }) => {

  if (!subscription) return <div />;

  return (
    <Dialog open={!!subscription} onClose={onClose}>
      <Box pad="small">

        {/* Editable Header */}
        <TextInput
          plain
          style={{ fontFamily: "Alegreya", fontSize: "24pt" }}
          value={subscription.name}
          placeholder="Name"
          onChange={edit("name")}
        />

        {/* Fields */}
        <Box pad="small" gap="small">
          <Box flex={"grow"} gap={"small"}>
            <Heading level={4} margin={"none"}>
              Price
            </Heading>
            <TextInput
              value={subscription.price}
              onChange={edit("price")}
            />
          </Box>
          <Box flex={"grow"} gap={"small"}>
            <Heading level={4} margin={"none"}>
              Category
            </Heading>
            <TextInput
              value={subscription.category}
              onChange={edit("category")}
            />
          </Box>
          <Box pad={"small"} gap={"small"}>
            <Heading level={4} margin={"none"}>
              Yearly
            </Heading>
            <CheckBox checked={subscription.yearly}
              onChange={({ target }) => edit("yearly")({ target: { value: target.checked } })} />
          </Box>

          <Box pad={"small"} gap={"small"}>
            <Heading level={4} margin={"none"}>
              Usefulness
            </Heading>
            <TextInput type={"number"} value={subscription.usefulness} onChange={edit("usefulness")} />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

EditSubscriptionModal.propTypes = {
  subscription: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired
};

export default EditSubscriptionModal;
