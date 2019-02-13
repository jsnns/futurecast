import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class StatsTables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    let { time, url } = this.props;
    if (time === "reality") url += "/report/stats/reality";
    if (time.length === 3) url += `/history/${time[0]}/${time[1]}/${time[2]}/stats`
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
      <div className="table">
        <h2>Stats</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stat</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map(d => (
              <TableRow key={d}>
                <TableCell component="th" scope="row">
                  {d}
                </TableCell>
                  <TableCell align="right">{data[d]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default StatsTables;