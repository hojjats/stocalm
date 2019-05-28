import {Component, Input, OnInit} from '@angular/core';
import {Constants} from '../../../../shared/constants';
import {ChartColor, ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  @Input() weekdayMeanValues;
  @Input() hourMeanValues;
  day = new Date().getDay();
  days = Constants.DAYS_MONDAY_FIRST;

  // Day chart
  public dayChartOptions: ChartOptions = {
    responsive: true,
    legend: {display: false},
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {suggestedMax: 70, beginAtZero: true, stepSize: 10},
      }],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public dayChartLabels: Label[] = Constants.DAYS_MONDAY_FIRST;
  public dayChartType: ChartType = 'bar';
  public dayChartLegend = true;
  // public dayChartPlugins = [pluginDataLabels];

  public dayChartData: ChartDataSets[] = [];

  // Hour chart
  public hourChartOptions: ChartOptions = {
    responsive: true,
    legend: {display: false},
    scales: {
      xAxes: [{
        ticks: {
          suggestedMax: 70,
          beginAtZero: true,
          stepSize: 5,
          maxRotation: 0,
          minRotation: 0,
        },
        gridLines: {display: false}
      }],
      yAxes: [{
        ticks: {
          suggestedMax: 70,
          beginAtZero: true,
          stepSize: 10,
          callback: function (value, index, values) {
            return value + ' db';
          }
        },
        gridLines: {display: false},
      },
      ],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    tooltips: {
        callbacks: {
          title: function(tooltipItems, data) {
            return Constants.HOURS[tooltipItems[0].index];
          }
        },
    },
  };
  public hourChartLabels: Label[] = Constants.HOURS_SHORT;
  public hourChartType: ChartType = 'bar';
  public hourChartLegend = true;
  // public hourChartPlugins = [pluginDataLabels];

  public hourChartData: ChartDataSets[] = [];

  constructor() {
  }

  ngOnInit() {
    this.setDay(new Date().getDay());
    // this.setWeekdayChart();
    this.setHourChart(this.day);
  }

  setDay(day: number) {
    if (day === 0) {
      this.day = 6;
    } else {
      this.day = day - 1;
    }
  }

  onChangeDay(number) {
    let newDay = this.day + number;
    if (newDay > 6) {
      newDay = 0;
    } else if (newDay < 0) {
      newDay = 6;
    }
    this.day = newDay;
    this.setHourChart(this.day);
  }

  setWeekdayChart() {
    this.dayChartData = [];
    this.dayChartData.push({
      data: this.weekdayMeanValues, label: 'Medelvärde i decibel'
    });
  }

  setHourChart(day: number) {
    this.hourChartData = [];
    this.hourChartData.push({
      data: this.hourMeanValues[day], label: 'Medelvärde i decibel'
    });
    const colors = [];
    for (let i = 0; i < this.hourChartData[0].data.length; i++) {
      const data = this.hourChartData[0].data[i];
      if (data > 65) {
        colors.push('#f44242');
      } else if (data >= 50) {
        colors.push('#f4e541');
      } else {
        colors.push('#2dce2d');
      }
    }
    this.hourChartData[0].backgroundColor = colors;

  }

}
