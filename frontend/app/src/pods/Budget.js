import React, { Component } from "react";
import { Doughnut } from "react-chartjs";

class Budget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    const { time } = this.props;
    let url;
    if (time === "reality") url = "http://10.0.0.41:5000/report/budget/reality";
    if (time.length === 3) url = `http://10.0.0.41:5000/history/${time[0]}/${time[1]}/${time[2]}/budget`
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const d = data.map(cat => ({
          value: cat[2],
          label: cat[0].toUpperCase()
        }));
        this.setState({ data: d });
      });
  }
  render() {
    const { data } = this.state;

    return (
      <div style={{width: 500, float: "left"}}>
        <h2>Budget</h2>
        <Doughnut width="500" height="500" options={{ percentageInnerCutout: 50 }} data={data} />
      </div>
    );
  }
}

export default Budget;