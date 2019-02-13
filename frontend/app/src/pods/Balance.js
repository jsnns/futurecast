import React, { Component } from "react";
import { Line } from "react-chartjs";

class Balance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    const { time } = this.props;
    let url;
    if (time === "reality") url = "http://10.0.0.41:5000/report/balances/reality";
    if (time.length === 3) url = `http://10.0.0.41:5000/history/${time[0]}/${time[1]}/${time[2]}/balances`
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const d = data.map(day => day.balance);
        const labels = data.map(day => day.day.substr(0,11));
        this.setState({
          data: {
            labels: labels,
            datasets: [{
              label: "Balances",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: d
            }]
          }
        });
      });
  }
  render() {
    const { data } = this.state;

    return (
      <div style={{width: window.innerWidth - 550, float: "right"}}>
        <h2>Balances</h2>
        <Line width={window.innerWidth - 550} redraw height={500} data={data} options={{
          pointHitDetectionRadius: 1,
	        bezierCurve : true,
	        bezierCurveTension : 0.5,
        }} />
      </div>
    );
  }
}

export default Balance;