import { Component, Input, OnInit } from '@angular/core';
import { disconnect } from 'process';

@Component({
  selector: 'app-fivedayforecast',
  templateUrl: './fivedayforecast.component.html',
  styleUrls: ['./fivedayforecast.component.scss']
})
export class FivedayforecastComponent implements OnInit {
  @Input() foreCastedWeatherChild;
  some;
  allDayTemp: Array<''> = [];
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
    this.some = this.foreCastedWeatherChild;
    if (this.some !== undefined) {
      this.dayAvgWeather();
      this.anotherdayAvgWeather(this.foreCastedWeatherChild);
    }

  }

  dayAvgWeather() {
    this.some.list.forEach((element, index) => {
      let pattern = /\d{4}\-\d{2}\-\d{2}/g;
      const day = element.dt_txt.match(pattern);
      // console.log(day);
      // console.log(index);

      if (element.dt_txt[index] === element.dt_txt[index + 1]) {
        // this.allDayTemp.push(element.dt_txt[index]);
      }
    });
  }

  anotherdayAvgWeather(data) {
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
      console.log('Date:', date);
      // current date -> date
      // original items array for this date -> groupedData[date]
      console.log('RowCount:', groupedData[date].length);
      console.log('MaxTemp:', this.getMax(groupedData[date], 'temp_max'));
      console.log('MinTemp:', this.getMin(groupedData[date], 'temp_min'));
      console.log('MaxHumidity:', this.getMax(groupedData[date], 'humidity'));
    }
  }


  getMax(arr, attr) {
    return Math.max.apply(Math, arr.map(item => item.main[attr]));
  }

  getMin(arr, attr) {
    return Math.min.apply(Math, arr.map(item => item.main[attr]));
  }

}
