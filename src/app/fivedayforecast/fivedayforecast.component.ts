import { Component, Input, OnInit } from "@angular/core";
import { disconnect } from "process";
import { ForecastedWeather } from "../models/forcastedData";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-fivedayforecast",
  templateUrl: "./fivedayforecast.component.html",
  styleUrls: ["./fivedayforecast.component.scss"],
})
export class FivedayforecastComponent implements OnInit {
  @Input() foreCastedWeatherChild;
  @Input() weatherUnitChild;
  arrayofWeatherForecasted = [];
  forecastedDay: string;
  forecastedDate: string;
  forecastedWeather = new ForecastedWeather();

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.dayAvgWeather(this.foreCastedWeatherChild);
      this.spinner.hide();
    },3000)

    // if (this.foreCastedWeatherChild !== undefined) {

    // }
  }

  dayAvgWeather(data) {
    const groupedData = data.list.reduce((days, row) => {
      // Get only date out of full date and time string, and use that to filter each object
      const date = row.dt_txt.split(" ")[0];
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

      this.arrayofWeatherForecasted.push({
        day: this.getDayName(date, "en-EN"),
        forecastedDate: date,
        dayMaxTemp: this.getMax(groupedData[date], "temp_max"),
        dayMinTemp: this.getMin(groupedData[date], "temp_min"),
        dayAvgFeelsLike: this.getMin(groupedData[date], "feels_like"),
        dayWeatherMain: groupedData[date][0].weather[0].main,
        dayWeatherDescription: groupedData[date][0].weather[0].description,
        dayWeatherDescriptionIcon: groupedData[date].length > 4 ? groupedData[date][3].weather[0].icon : groupedData[date][0].weather[0].icon
      });
    }

    this.arrayofWeatherForecasted.shift();
    console.log(this.arrayofWeatherForecasted);
  }

  getDayName(dateStr, locale) {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  getAvg(arr, attr) {
    let getNumber = arr.map((item) => item.main(attr));
    return getNumber.reduce((a, b) => a + b) / getNumber.length;
  }

  getMax(arr, attr) {
    return Math.max.apply(
      Math,
      arr.map((item) => item.main[attr])
    );
  }

  getMin(arr, attr) {
    return Math.min.apply(
      Math,
      arr.map((item) => item.main[attr])
    );
  }
}
