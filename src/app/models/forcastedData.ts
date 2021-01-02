export class ForecastedWeather {
  public day: string;
  public forecastedDate: Date;
  public dayMaxTemp: number;
  public dayMinTemp: number;
  public dayAvgFeelsLike: number;
  public dayWeatherMain: string;
  public dayWeatherDescription: string;

  constructor() {
    this.day = '';
    this.forecastedDate = new Date();
    this.dayMaxTemp = 0;
    this.dayMinTemp = 0;
    this.dayAvgFeelsLike = 0;
    this.dayWeatherMain = '';
    this.dayWeatherDescription = '';
  }
}
