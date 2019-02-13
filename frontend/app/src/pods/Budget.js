import React, { Component } from "react";
import { Pie } from "react-chartjs";

class Budget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    if (window.innerWidth < 500) {
      this.setState({
        mobile: true
      })
    }
    let { time, url } = this.props;
    if (time === "reality") url += "/report/budget/reality";
    if (time.length === 3) url += `/history/${time[0]}/${time[1]}/${time[2]}/budget`
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let total = 0
        const d = data.map(cat => {
          total += cat[2]
          return {
            value: cat[2],
            label: cat[0].toUpperCase()
          }
        });
        d.push({
          value: (1 - total).toFixed(2),
          label: "FREE",
          color: "#fff"
        })
        this.setState({ data: d });
      }).catch(err => console.log(err))
  }
  render() {
    const { data, mobile } = this.state;

    return (
      <div className="budget">
        <h2>Budget</h2>
        <Pie redraw width={mobile ? window.innerWidth * .25 : 500} height={mobile ? window.innerWidth * .25 : 500} data={data} options={{ segmentStrokeWidth: 0 }} />
      </div>
    );
  }
}

export default Budget;