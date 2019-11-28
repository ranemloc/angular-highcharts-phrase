import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(translateService: TranslateService) {
    console.log('Generate chart options');
    this.chartOptions = {
      title: {
        text: translateService.instant('chart-title')
      },
      series: [{
        data: [1, 2, 3],
        type: 'line'
      }]
    };
  }

}
