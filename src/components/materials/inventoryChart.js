import React, { Component } from 'react';
import Chart from 'chart.js';

var defaultColours = [
  '#f44336', '#E91E63', '#9C27B0', '#673AB7',
  '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
  '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
  '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
  '#795548', '#9E9E9E', '#607D8B',
];

class MaterialInventoryChart extends Component {
  componentDidMount() {
    const { material: { operationsSegmentMaterialSpecifications } } = this.props;

    const consumedMaterialLots = operationsSegmentMaterialSpecifications.reduce((acc, spec) => {
      spec.operationsSegment.operationsSegmentMaterialSpecifications.forEach((consumedSpec) => {
        acc = { ...acc, [consumedSpec.materialDefinition.id]: consumedSpec.materialDefinition };
      });

      return acc;
    }, {});

    consumedMaterialLots[this.props.material.id] = this.props.material;

    const datasets = Object.keys(consumedMaterialLots).reduce((acc, materialId, index) => {
      const colour = defaultColours[index + 1] || 'grey';
      const material = consumedMaterialLots[materialId];
      return [
        ...acc,
        {
          data: material.materialLots.map(lot => ({ y: lot.quantity, x: lot.date })),
          label: material.description,
          steppedLine: 'before',
          fill: false,
          borderColor: colour,
          backgroundColor: Chart.helpers.color(colour).alpha(0.5).rgbString(),
        }
      ]
    }, []);

    new Chart(this.canvas, {
      type: 'line',
      data: {
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: 'time',
            display: true,
            time: {
              unit: 'day',
            },
          }],
          yAxes: [{
            display: true,
            offset: true,
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

export default MaterialInventoryChart;
