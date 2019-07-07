import React, { useState } from "react";
import { Box, RangeInput, Heading, Table, TableRow, TableCell, TableBody } from "grommet";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { getStats } from "../../../data/logic";
import Stat from "../../_shared_/Stat";
import Input from "../../_shared_/Input";
import Currency from "../../_shared_/Currency";

let query = gql`
    {
        transactions {
            id
            value
            name
            start
            end
            category
            interval_days
            interval_months
        }
    }
`;

const SavingsCalculator = () => {
  const [savingsRate, setSavingsRate] = useState(0.6);
  const [max401k, setMax401k] = useState(500);

  return (
    <Query query={query}>
      {({ error, data, loading }) => {
        if (error) return `Error! ${error.message}`;
        if (loading) return `Loading...`;

        const { income, expenses } = getStats(data.transactions);
        const dif = income + expenses;

        const retirement = dif > max401k ? max401k : dif;
        const savings = savingsRate * (dif - max401k);
        const spending = (1 - savingsRate) * (dif - max401k);


        return <Box pad={"small"}>
          <Box pad={"small"}>
            <Heading level={4} margin={"none"}>
              Savings Rate
            </Heading>
            <RangeInput margin={"none"} min={0} max={1} step={0.05} onChange={e => setSavingsRate(e.target.value)} />
            {(savingsRate * 100).toFixed(0)}%
          </Box>

          <Box pad={"small"}>
            <Heading level={4} margin={"none"}>
              Max 401k
            </Heading>
            <RangeInput margin={"none"} min={0} max={dif} step={50} onChange={e => setMax401k(e.target.value)} />
            <Currency value={max401k} />
          </Box>

          <Box gap={"medium"} background={"dark-1"} pad={"small"}>
            <Stat value={dif} label={"Leftover"}/>
            <Table margin={"none"}>
              <TableBody>
                <TableRow>
                  <TableCell>401k</TableCell>
                  <TableCell><Currency value={retirement}/></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Savings</TableCell>
                  <TableCell><Currency value={savings}/></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Spending</TableCell>
                  <TableCell><Currency value={spending}/></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>;


      }}
    </Query>
  );
};

export default SavingsCalculator;