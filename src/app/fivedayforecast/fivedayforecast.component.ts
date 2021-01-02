import { Component, Input, OnInit } from '@angular/core';
import { disconnect } from 'process';
import { ForecastedWeather } from '../models/forcastedData';

@Component({
  selector: 'app-fivedayforecast',
  templateUrl: './fivedayforecast.component.html',
  styleUrls: ['./fivedayforecast.component.scss']
})
export class FivedayforecastComponent implements OnInit {
  @Input() foreCastedWeatherChild;
  @Input() weatherUnitChild;
  allDayTemp: Array<''> = [];
  arrayofWeatherForecasted = [];
  forecastedDay: string;
  forecastedDate: string;
  dayMaxTemp : number;
  dayMinTemp : number;
  dayMaxHumidity : number;
  dayFeelsLike : number;
  dayWeatherMain : string;
  dayWeatherDescription: string;
  dayAvgFeelsLike: number;
  forecastedWeather = new ForecastedWeather;
  fiveDaysForcastArray = [
    {
      'day': 'Sunday',
      'date': '11/3',
      'detail1': 'Mix of sunny with cloud',
      'detail2': 45,
      'detail3': 41,
      'detail4': 30,
      'detail5': '12N',
      'detail6': 41,
      'detail7': '2H'
    },
    {
      'day': 'Monday',
      'date': '11/4',
      'detail1': 'Mix of sunny with cloud',
      'detail2': 45,
      'detail3': 41,
      'detail4': 30,
      'detail5': '12N',
      'detail6': 41,
      'detail7': '2H'
    },
    {
      'day': 'Tuesday',
      'date': '11/5',
      'detail1': 'Mix of sunny with cloud',
      'detail2': 45,
      'detail3': 41,
      'detail4': 30,
      'detail5': '12N',
      'detail6': 41,
      'detail7': '2H'
    },
    {
      'day': 'Wednesday',
      'date': '11/6',
      'detail1': 'Mix of sunny with cloud',
      'detail2': 45,
      'detail3': 41,
      'detail4': 30,
      'detail5': '12N',
      'detail6': 41,
      'detail7': '2H'
    },
    {
      'day': 'Thursday',
      'date': '11/7',
      'detail1': 'Mix of sunny with cloud',
      'detail2': 45,
      'detail3': 41,
      'detail4': 30,
      'detail5': '12N',
      'detail6': 41,
      'detail7': '2H'
    }
  ]
  constructor() { }

  ngOnInit() {
    console.log(this.foreCastedWeatherChild);
    console.log(this.weatherUnitChild);
    if (this.foreCastedWeatherChild !== undefined) {
      this.dayAvgWeather(this.foreCastedWeatherChild);
      // this.anotherdayAvgWeather(this.foreCastedWeatherChild);
    }

  }

  dayAvgWeather(data) {
    const groupedData = data.list.reduce((days, row) => {
      // Get only date out of full date and time string, and use that to filter each object
      const date = row.dt_txt.split(' ')[0];
      /**
       * What do we have : days(date), row(its object from response(data.list))
       *
       * Create an array of objects which are related to same dates
       * 1.In this loop, "days" is 1st element, "row" is second element
       * 2.if "days"'s 'date' matches to next "days"'s 'date' then push related "row" in to one array,
       *   if not then push the next object("row") in to new array
       *
       * What do we want : An object with date as property and it's value is array of object related to that date
       */
      days[date] = [...(days[date] ? days[date] : []), row];
      return days;
    }, {});

    /**
     * Each key:value pair in new object is like this 2020-31-12: [{},{},{},{}]
     * So by the use of object.keys() method, run a loop on each key
     */
    for (let date of Object.keys(groupedData)) {
      console.log(groupedData[date]);
      // current date -> date
      // original items array for this date -> groupedData[date]
      console.log('RowCount:', groupedData[date].length);
      this.forecastedDay = this.getDayName(date, 'en-EN');
      this.forecastedDate = date;
      console.log('Date:', date);
      console.log('Day:', this.forecastedDay);
      this.dayMaxTemp = this.getMax(groupedData[date], 'temp_max');
      console.log('Max_temp', this.dayMaxTemp);
      this.dayMinTemp = this.getMin(groupedData[date], 'temp_min');
      console.log('Min_temp', this.dayMinTemp);
      this.dayAvgFeelsLike = this.getMin(groupedData[date], 'feels_like');
      console.log('Avg Feels_Like', this.dayAvgFeelsLike);
      this.dayWeatherMain = groupedData[date][0].weather[0].main;
      this.dayWeatherDescription = groupedData[date][0].weather[0].description;
      console.log('Weather', this.dayWeatherMain, this.dayWeatherDescription);

      console.log(/n/);
      this.arrayofWeatherForecasted.push({
        day : this.getDayName(date, 'en-EN'),
        forecastedDate : date,
        dayMaxTemp : this.getMax(groupedData[date], 'temp_max'),
        dayMinTemp : this.getMin(groupedData[date], 'temp_min'),
        dayAvgFeelsLike : this.getMin(groupedData[date], 'feels_like'),
        dayWeatherMain : groupedData[date][0].weather[0].main,
        dayWeatherDescription : groupedData[date][0].weather[0].description
      });

    }
    console.log(/n/);
    console.log(this.arrayofWeatherForecasted);
    console.log(/n/);
  }

  getDayName(dateStr, locale) {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
  }

  getWeatherDescription(arr, attr) {
    // console.log(arr);
    // let cool = arr[0].weather[0].main;
    // console.log(cool);
  }

  getAvg(arr, attr) {
    let getNumber = arr.map(item => item.main(attr));
    return getNumber.reduce((a,b) => a + b) / getNumber.length;
  }

  getMax(arr, attr) {
    return Math.max.apply(Math, arr.map(item => item.main[attr]));
  }

  getMin(arr, attr) {
    return Math.min.apply(Math, arr.map(item => item.main[attr]));
  }

}
