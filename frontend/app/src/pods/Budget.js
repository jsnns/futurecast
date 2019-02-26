import React, { Component } from "react";
import { Pie } from "react-chartjs";

import { getBudget} from "../api"

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
    const { report } = this.props
    getBudget(report)
      .then(data => {
        let total = 0
        let budgetCategories = data
        budgetCategories = budgetCategories.map(category => {
            total += category[2]
            return {
              value: (category[2] * 100).toFixed(2),
              label: category[0].toUpperCase()
            }
          })
          .sort((a, b) => {
            return a.value - b.value
          });
        
        budgetCategories.push({
          value: ((1 - total) * 100).toFixed(2),
          label: "FREE",
          color: "#222"
        })
        this.setState({ data: budgetCategories });
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const { data, mobile } = this.state;

    return (
      <div>
        <h2>Budget</h2>
        <div className="budget">
          <Pie
            redraw
            width={mobile ? window.innerWidth * .70 : window.innerWidth * .15}
            height={mobile ? window.innerWidth * .70 : window.innerWidth * .15}
            data={data}
            options={{ segmentStrokeWidth: 0, segmentStrokeColor: "#222" }} />
        </div>
      </div>
    );
  }
}

export default Budget;