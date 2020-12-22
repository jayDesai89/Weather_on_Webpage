import { Component, OnInit,} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherDataService } from '../services/weatherData/weather-data.service';
import { NotFoundError } from '../models/notFoundError';
import { ApplicationErrors } from '../models/app-errors';
import { HttpErrorResponse } from '@angular/common/http';
import { TempUnitUpdateService } from '../services/temp-unit-update.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  city = 'Toronto';
  displayWeather = false;
  findCityForm: FormGroup;
  cityWeather;
  mainWeather: number = 273.13;
  minWeather: number = 273.13;
  maxWeather: number = 273.13;
  forecastedWeather;
  showForecast: boolean;
  failRequest: boolean;
  errMessage: any;
  weatherUnit: any;

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
      this.mainWeather = this.cityWeather.main.temp;
      this.maxWeather  = this.cityWeather.main.temp_max;
      this.minWeather  = this.cityWeather.main.temp_min;
      console.log(`Dashboard ${this.cityWeather}`);
    },
    (err) => {
      this.errMessage = err.originalError.error.message;
      this.failRequest = true;
    })
  }

  // On form submission get the name of searched city and get weather
  getWeatherForSearchedCity(value) {
    console.log(value);
    this.city = value.nameOfCity;
    console.log(this.city);
    this.getWeatherForCity(this.city);
  }

  // Get forecasted weather of city
  getForecastedWeather(value) {
    this.weatherDataService.getForecastOfWeather(this.city).subscribe((res: Response ) => {
      this.forecastedWeather = res;
      console.log(res);
    },
    (error: Response) => {
      // Expected Errors
      if (error.status === 404) {
        alert ('No worries! This error is expected');
      } else {
        alert ('Oops! This is unexpected');
      }
    })
  }

  // Switch unit from fahrenheit to celsius and vise vers
}
