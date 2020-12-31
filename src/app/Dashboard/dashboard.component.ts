import { Component, EventEmitter, OnInit, Output,} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherDataService } from '../services/weatherData/weather-data.service';
import { NotFoundError } from '../models/notFoundError';
import { ApplicationErrors } from '../models/app-errors';
import { HttpErrorResponse } from '@angular/common/http';
import { TempUnitUpdateService } from '../services/temp-unit-update.service';
import { WeatherDataByCity } from '../models/dataByCity';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  city = 'Toronto';
  displayWeather = false;
  findCityForm: FormGroup;
  cityWeather : any;
  mainWeather: number = 273.13;
  minWeather: number = 273.13;
  maxWeather: number = 273.13;
  forecastedWeatherParent;
  showForecast: boolean;
  failRequest: boolean;
  errMessage: any;
  weatherUnit: any;
  showForeCast: boolean = false;


   get cityName() {
     return this.findCityForm.get('nameOfCity');
   }
  /**: any
   * Get name of the city
   * Get the weather of that city
   * @param formBuilder
   * @param weatherDataService
   */

  constructor(private formBuilder: FormBuilder,
    private weatherDataService: WeatherDataService,
    private tempUnitUpdateService: TempUnitUpdateService ) {
  }

  ngOnInit() {
    // Create a form
    this.findCityForm = this.formBuilder.group({
      'nameOfCity': new FormControl('', Validators.required)
    });

    // update view if formfield's value updates
    this.findCityForm.get('nameOfCity').valueChanges.subscribe((res) => {
      this.showForecast = false;
    })

    this.tempUnitUpdateService.getTempUnitValue.subscribe((unitVal) => {
      this.weatherUnit = unitVal;
    });

    this.getWeatherForCity(this.city);
  }

  // get current weather for selected city
  getWeatherForCity(value) {
    // Method call form service
    this.weatherDataService.getWeatherData(value).subscribe((res) => {
      this.cityWeather = res;
      let p = JSON.stringify(this.cityWeather);
      console.log(this.cityWeather);
      console.dir(this.cityWeather);
      this.mainWeather = this.cityWeather.main.temp;
      this.maxWeather  = this.cityWeather.main.temp_max;
      this.minWeather  = this.cityWeather.main.temp_min;
    },
    (err) => {
      this.errMessage = err.originalError.error.message;
      this.failRequest = true;
    })
  }

  // On form submission get the name of searched city and get weather
  getWeatherForSearchedCity(value) {
    this.city = value.nameOfCity;
    this.getWeatherForCity(this.city);
  }

  // Get forecasted weather of city
  getForecastedWeather(showForeCast) {
    if (showForeCast) {
      this.weatherDataService.getForecastOfWeather(this.city).subscribe((res) => {
        console.log(res);
        // this.forecastedWeather = res;
        this.forecastedWeatherParent = res;
      },
        (error: Response) => {
          // Expected Errors
          if (error.status === 404) {
            alert('No worries! This error is expected');
          } else {
            alert('Oops! This is unexpected');
          }
        })
    }
  }

  // Switch unit from fahrenheit to celsius and vise vers
}
