import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { getBills } from "../api"

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

class BillsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        };
    }
    componentWillMount() {
        const { report } = this.props
        getBills(report)
            .then(data => {
                this.setState({ data });
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        const { data } = this.state;
        return (
            <div className="tx-table">
                <h2>Transactions</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Value</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(data).map(set => {
                            let dataset = data[set]
                            if (dataset.map) {
                                return dataset.map(tx => {
                                    return <TableRow>
                                        <TableCell component="th" scope="row">{tx.name.toUpperCase()}</TableCell>
                                        <TableCell component="th" scope="row" style={{fontFamily: "monospace", fontSize: 16}}>${numberWithCommas(tx.value)}</TableCell>
                                        <TableCell component="th" scope="row">{tx.date.substr(0, 16)}</TableCell>
                                        <TableCell component="th" scope="row">{set.toUpperCase()}</TableCell>
                                    </TableRow>
                                })
                                
                            } else return [];
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default BillsTable;