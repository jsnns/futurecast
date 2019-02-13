import React, { Component } from "react";
import { Line } from "react-chartjs";

class Balance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      days: ""
    };
    this.getData = this.getData.bind(this)
  }

  getData(days) {
    let { time, url } = this.props;
    if (time === "reality") url += "/report/balances/reality";
    if (time.length === 3) url += `/history/${time[0]}/${time[1]}/${time[2]}/balances`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      const d = data.map(day => day.balance);
      const labels = data.map(day => day.day.substr(0, 11)).map((label, i) => i % 5 === 0 ? label : "");
      this.setState({
        data: {
          labels: labels.slice(0, Number(days) || Infinity),
          datasets: [{
            label: "Balance",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: d.slice(0, Number(days) || Infinity)
          }]
        }
      });
    }).catch(err => console.log(err))
  }

  componentWillMount() {
    let days = ""
    if (window.innerWidth < 500) {
      days = 30
      this.setState({
        mobile: true
      })
    }
    this.getData(days)
  }
  render() {
    const { data, mobile } = this.state;

    return (
      <div className="balance">
        <h2>Balances</h2>
        <input onChange={(e) => this.getData(e.target.value)}></input>
        <Line style={{width: mobile ? window.innerWidth *.9 : window.innerWidth * .75, height: mobile? 200:500}} update redraw height={500} data={data} options={{
          pointHitDetectionRadius: 1,
	        bezierCurve : true,
	        bezierCurveTension : 0.5,
        }} />
      </div>
    );
  }
}

export default Balance;