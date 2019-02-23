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
            value: (cat[2] * 100).toFixed(2),
            label: cat[0].toUpperCase()
          }
        }).sort((a, b) => a.value - b.value);
        d.push({
          value: ((1 - total) * 100).toFixed(2),
          label: "FREE",
          color: "#222"
        })
        this.setState({ data: d });
      }).catch(err => console.log(err))
  }
  render() {
    const { data, mobile } = this.state;

    return (
      <div className="budget">
        <h2>Budget</h2>
        <Pie
          redraw
          width={mobile ? window.innerWidth * .30 : window.innerWidth * .15}
          height={mobile ? window.innerWidth * .30 : window.innerWidth * .15}
          data={data}
          options={{ segmentStrokeWidth: 0, segmentStrokeColor: "#222" }} />
      </div>
    );
  }
}

export default Budget;