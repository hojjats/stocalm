import {Component, Input, OnInit} from '@angular/core';
import {Constants} from '../../../../shared/constants';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {Reading} from '../../../../shared/models/reading.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  @Input() readings: Reading[];
  weekdayMeanValues = [];
  hourMeanValues = [];
  day = new Date().getDay();
  days = Constants.DAYS;


  // Day chart
  public barChartOptions: ChartOptions = {
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
  public barChartLabels: Label[] = Constants.DAYS;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [];

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
    this.setMeanValues();
    this.setHourChart(this.day);
    this.barChartData.push({data: this.weekdayMeanValues, label: 'Medelvärde'});
  }

  setDay(number) {
    const newDay = this.day + number;
    if (newDay >= 0 && newDay <= 6) {
      this.day = newDay;
      this.setHourChart(this.day);
    }
  }

  setHourChart(day: number) {
    this.hourChartData = [];
    this.hourChartData.push({
      data: this.hourMeanValues[day], label: 'Medelvärde'
    });
  }

  setMeanValues() {

    if (this.readings != null) {

      const days: Reading[][][] = [];
      for (let i = 0; i < 7; i++) { // Days of week
        days[i] = [];
        for (let j = 0; j < 24; j++) {
          days[i][j] = [];
        }
      }

      this.readings.forEach(reading => {
        const date = new Date(reading.date);
        const dayOfWeek: number = date.getDay();
        const hour: number = Number.parseInt(reading.time.substr(0, 2), 10); // 0(0) - 23
        days[dayOfWeek][hour].push(reading);
      });

      const weekdaymMeanValues: number[] = [];
      for (let i = 0; i < 7; i++) {
        weekdaymMeanValues[i] = undefined;
      }

      const hourMeanValues: number[][] = [];
      for (let i = 0; i < 7; i++) {
        hourMeanValues[i] = [];
        for (let j = 0; j < 24; j++) {
          hourMeanValues[i][j] = 0;
        }
      }

      for (let i = 0; i < days.length; i++) {
        let readingPerDay = 0;
        let totalValuePerDay = 0;
        for (let j = 0; j < days[i].length; j++) {
          let readingsPerHour = 0;
          let totalValuePerHour = 0;
          for (const reading of days[i][j]) {
            readingPerDay++;
            totalValuePerDay += reading.value;
            readingsPerHour++;
            totalValuePerHour += reading.value;
          }
          hourMeanValues[i][j] = totalValuePerHour = 0 ? 0 : this.roundToXDecimal(totalValuePerHour / readingsPerHour, 2);
        }
        weekdaymMeanValues[i] = totalValuePerDay = 0 ? 0 : this.roundToXDecimal(totalValuePerDay / readingPerDay, 2);
      }


      this.hourMeanValues = hourMeanValues;
      this.weekdayMeanValues = weekdaymMeanValues;
      console.log(this.hourMeanValues);
      console.log(weekdaymMeanValues);
    }

  }

  roundToXDecimal(value: number, x: number): number {
    let times = 1;
    for (let i = 0; i < x; i++) {
      times *= 10;
    }
    return Math.round(value * times) / times;
  }


}
