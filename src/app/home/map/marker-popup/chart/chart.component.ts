import {Component, Input, OnInit} from '@angular/core';
import {Constants} from '../../../../shared/constants';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {Reading} from '../../../../shared/models/reading.model';
import {Sensor} from '../../../../shared/models/sensor.model';

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
        ticks: {suggestedMax: 70, beginAtZero: true, stepSize: 5}
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
      xAxes: [{ticks: {suggestedMax: 70, beginAtZero: true, stepSize: 5}}],
      yAxes: [{
        ticks: {suggestedMax: 70, beginAtZero: true, stepSize: 5}
      }],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public hourChartLabels: Label[] = Constants.HOURS;
  public hourChartType: ChartType = 'horizontalBar';
  public hourChartLegend = true;
  // public hourChartPlugins = [pluginDataLabels];

  public hourChartData: ChartDataSets[] = [];

  constructor() {
  }

  ngOnInit() {
    this.setDay(new Date().getDay());
    this.setWeekdayChart();
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
    const newDay = this.day + number;
    if (newDay >= 0 && newDay < 7) {
      this.day = newDay;
    }
    this.setHourChart(this.day);
  }

  setWeekdayChart() {
    this.dayChartData = [];
    this.dayChartData.push({
      data: this.weekdayMeanValues, label: 'Medelvärde'
    });
  }

  setHourChart(day: number) {
    this.hourChartData = [];
    this.hourChartData.push({
      data: this.hourMeanValues[day], label: 'Medelvärde'
    });
  }

}
