import { Component, HostListener, OnInit,} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherDataService } from '../services/weatherData/weather-data.service';
import { TempUnitUpdateService } from '../services/temp-unit-update.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
// import { select, Store } from '@ngrx/store';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  /** ========================== */
    // todos: Observable<Todo[]>;

  /** ========================== */

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
  screenWidth: any;
  screenHeight: any;
  showMobile: boolean = false;
  some: any;


  get nameOfCity() {
    return this.findCityForm.get('nameOfCity');
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
  ) {
    // store.pipe(select('todos')).subscribe(values => {
    //   console.log(values);
    //   // this.todos = values;
    // })
  }

  ngOnInit() {
    // Create a form
    this.findCityForm = this.formBuilder.group({
      nameOfCity: new FormControl("", [Validators.required]),
    });

    // update view if formfield's value updates
    this.findCityForm.get("nameOfCity").valueChanges.subscribe((val) => {
      // console.log(val);
      this.showForecast = false;
      this.failRequest = false;
    });

    this.tempUnitUpdateService.getTempUnitValue.subscribe((unitVal) => {
      this.weatherUnit = unitVal;
    });

    this.getWeatherForCity(this.city);
    this.getScreenSize(this.some);
  }

  // get current weather for selected city
  getWeatherForCity(value) {
    // Method call form service
    this.weatherDataService.getWeatherData(value).subscribe(
      (res) => {
        this.cityWeather = res;
        console.log(this.cityWeather);
        this.mainWeather = this.cityWeather.main.temp;
        this.maxWeather = this.cityWeather.main.temp_max;
        this.minWeather = this.cityWeather.main.temp_min;
        this.feelsLike = this.cityWeather.main.feels_like;

        // const obj = this.cityWeather;
        // console.log(new Date(obj.dt*1000-(obj.timezone*1000))); // minus
        // console.log(new Date(obj.dt*1000+(obj.timezone*1000))); // plus
      },
      (err) => {
        this.errMessage = err.originalError.error.message;
        this.failRequest = true;
      }
    );

    this.showForeCast = false;
    console.log(this.showForeCast);
  }

  get cityName() {
    return this.findCityForm.get("nameOfCity");
  }

  // On form submission get the name of searched city and get weather
  getWeatherForSearchedCity(value) {
    this.city = value.nameOfCity;
    this.getWeatherForCity(this.city);
  }

  // Get forecasted weather of city
  getForecastedWeather(val) {
        this.weatherDataService.getForecastOfWeather(this.city).subscribe(
          (res) => {
            console.log(res);
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

  @HostListener('window:resize', ['$event'])

  getScreenSize(event){
    this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      this.screenWidth < 992 ? this.showMobile = true : this.showMobile= false;
  }

  // Switch unit from fahrenheit to celsius and vise vers
}
