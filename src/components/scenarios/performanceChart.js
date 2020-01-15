import React, { Component } from 'react';
import Chart from 'chart.js';

class ScenarioPerformanceChart extends Component {
  componentDidMount() {
    const { scenario: { scenarioAttribute } } = this.props;

    const data = scenarioAttribute ? [
      scenarioAttribute.changeoverTime,
      scenarioAttribute.changeoverCount,
      scenarioAttribute.waitingTime,
      scenarioAttribute.overdueCount,
      scenarioAttribute.conflictCount,
      scenarioAttribute.inventoryShortage
    ] : [0, 0, 0, 0, 0, 0, 0, 0]

    new Chart(this.canvas, {
      type: 'bar',
      data: {
        labels: ["Changeover Time", "Changeovers", "Waiting Time", "Overdue Orders", "Resource Conflicts", "Inventory Shortage"],
        datasets: [{
          label: 'Scenario Performance',
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }],
          xAxes: [{
            display: false,
          }]
        }
      }
    });
  }

  render() {
    return (
      <canvas ref={(canvas) => { this.canvas = canvas; }} />
    )
  }
}

export default ScenarioPerformanceChart;
