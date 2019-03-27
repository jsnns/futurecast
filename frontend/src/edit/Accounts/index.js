import React, { Component } from "react";
import { getAccounts, updateAccount } from "../../api";
import { Box, TextInput, Text } from "grommet";
import { Checkmark } from "grommet-icons";
import AsyncButton from "../../components/AsyncButton";

class EditAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acs: [],
      updatedAcs: [],
      updating: null
    };
    this.getData = this.getData.bind(this);
    this.push = this.push.bind(this);
    this.markAccountDoneUpdating = this.markAccountDoneUpdating.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  push(i) {
    return () => {
      this.setState({ updating: i });
      let { acs, updatedAcs } = this.state;
      const ac = acs[i];

      if (ac._id)
        return updateAccount(ac._id.$oid, ac).then(() => {
          updatedAcs = updatedAcs.filter(ii => ii !== i);
          this.setState({
            updatedAcs,
            updating: null
          });
        });
    };
  }

  changeAc(i, key) {
    return e => {
      let value = e.target.value;
      let { acs, updatedAcs } = this.state;
      if (["balance"].includes(key)) value = Number(value);

      acs[i][key] = value;
      updatedAcs.push(i);
      this.setState({ acs, updatedAcs });
    };
  }

  markAccountDoneUpdating(i) {
    let { updatedAcs } = this.state;
    updatedAcs = updatedAcs.filter(ii => i !== ii);
    this.setState({ updatedAcs });
  }

  async getData() {
    const data = await getAccounts();
    this.setState({ acs: data });
  }

  render() {
    return (
      <Box pad="medium">
        <Box direction="row" wrap>
          {this.state.acs.map((ac, i) => {
            return (
              <Box
                style={{ position: "relative" }}
                pad={{
                  top: "small",
                  bottom: "small",
                  left: "small",
                  right: "small"
                }}
                background="neutral-3"
                elevation="small"
                margin="small"
                round
              >
                <AsyncButton
                  icon={<Checkmark />}
                  done={this.markAccountDoneUpdating}
                  onClick={this.push(i)}
                  shown={this.state.updatedAcs.includes(i)}
                />
                <Box direction="row" pad={{ left: "small", right: "small" }}>
                  <Text
                    style={{
                      fontFamily: "Abril Fatface",
                      fontSize: "18pt",
                      opacity: 0.99,
                      marginTop: 3,
                      marginRight: 4
                    }}
                  >
                    $
                  </Text>
                  <TextInput
                    plain
                    defaultValue={ac.balance}
                    style={{
                      fontFamily: "Abril Fatface",
                      fontSize: "22pt",
                      opacity: 0.99,
                      padding: 0,
                      width: 100
                    }}
                    onChange={this.changeAc(i, "balance")}
                  />
                </Box>
                <TextInput
                  plain
                  defaultValue={ac.name}
                  style={{
                    fontFamily: "Alegreya",
                    fontSize: "16pt",
                    width: 200,
                    paddingTop: 0,
                    paddingBottom: 0
                  }}
                  onChange={this.changeAc(i, "name")}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
}

export default EditAccounts;
