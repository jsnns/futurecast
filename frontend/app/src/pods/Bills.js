import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class BillsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        };
    }
    componentWillMount() {
        let { time, url } = this.props;
        if (time === "reality") url += "/report/bills/reality";
        if (time.length === 3) url += `/history/${time[0]}/${time[1]}/${time[2]}/bills`
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ data });
            }).catch(err => console.log(err))
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
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Value</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(data).map(set => {
                            let dataset = data[set]
                            if (dataset.map) {
                                return dataset.map(tx => {
                                    return <TableRow>
                                        <TableCell component="th" scope="row">{tx.name}</TableCell>
                                        <TableCell component="th" scope="row">{set}</TableCell>
                                        <TableCell component="th" scope="row">{tx.value}</TableCell>
                                        <TableCell component="th" scope="row">{tx.date}</TableCell>
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