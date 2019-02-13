import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class StatsTables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    const { time } = this.props;
    let url;
    if (time === "reality") url = "http://10.0.0.41:5000/report/stats/reality";
    if (time.length === 3) url = `http://10.0.0.41:5000/history/${time[0]}/${time[1]}/${time[2]}/stats`
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const d = Object.keys(data).map(key => ({ key, value: data[key] }));
        this.setState({ data: d });
      });
  }
  render() {
    const { data } = this.state;
    return (
      <div style={{width: 500}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stat</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(d => (
              <TableRow key={d.key}>
                <TableCell component="th" scope="row">
                  {d.key}
                </TableCell>
                <TableCell align="right">{d.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default StatsTables;