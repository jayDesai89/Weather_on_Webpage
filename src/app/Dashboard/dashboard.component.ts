import { Component, OnInit,} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherDataService } from '../services/weatherData/weather-data.service';
import { TempUnitUpdateService } from '../services/temp-unit-update.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  city = "Toronto";
  displayWeather = false;
  findCityForm: FormGroup;
  cityWeather: any;
  mainWeather: number = 273.13;
  minWeather: number = 273.13;
  maxWeather: number = 273.13;
  forecastedWeatherParent;
  showForecast: boolean;
  failRequest: boolean;
  errMessage: any;
  weatherUnit: any;
  showForeCast: boolean = false;
  feelsLike;

  get cityName() {
    return this.findCityForm.get("nameOfCity");
  }
  /**: any
   * Get name of the city
   * Get the weather of that city
   * @param formBuilder
   * @param weatherDataService
   */

  constructor(
    private formBuilder: FormBuilder,
    private weatherDataService: WeatherDataService,
    private tempUnitUpdateService: TempUnitUpdateService
  ) {}

  ngOnInit() {
    // Create a form
    this.findCityForm = this.formBuilder.group({
      nameOfCity: new FormControl("", Validators.required),
    });

    // update view if formfield's value updates
    this.findCityForm.get("nameOfCity").valueChanges.subscribe((val) => {
      console.log(val);
      this.showForecast = false;
    });

    this.tempUnitUpdateService.getTempUnitValue.subscribe((unitVal) => {
      this.weatherUnit = unitVal;
    });

    this.getWeatherForCity(this.city);
  }

  // get current weather for selected city
  getWeatherForCity(value) {
    // Method call form service
    this.weatherDataService.getWeatherData(value).subscribe(
      (res) => {
        this.cityWeather = res;
        console.log(this.cityWeather);
        console.dir(this.cityWeather);
        this.mainWeather = this.cityWeather.main.temp;
        this.maxWeather = this.cityWeather.main.temp_max;
        this.minWeather = this.cityWeather.main.temp_min;
        this.feelsLike = this.cityWeather.main.feels_like;
      },
      (err) => {
        this.errMessage = err.originalError.error.message;
        this.failRequest = true;
      }
    );
  }

  selectInput(event) {
    console.log('123', event);
  }

  // On form submission get the name of searched city and get weather
  getWeatherForSearchedCity(value) {
    this.city = value.nameOfCity;
    this.getWeatherForCity(this.city);
  }

  // Get forecasted weather of city
  getForecastedWeather(showForeCast) {
        this.weatherDataService.getForecastOfWeather(this.city).subscribe(
          (res) => {
            console.log(res);
            // this.forecastedWeather = res;
            this.forecastedWeatherParent = res;
          },
          (error: Response) => {
            // Expected Errors
            if (error.status === 404) {
              alert("No worries! This error is expected");
            } else {
              alert("Oops! This is unexpected");
            }
          }
        );
  }

  // Switch unit from fahrenheit to celsius and vise vers
}
