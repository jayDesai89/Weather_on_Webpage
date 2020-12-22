import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherDataService } from './weather-data.service';

describe('WeatherDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [WeatherDataService],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: WeatherDataService = TestBed.get(WeatherDataService);
    expect(service).toBeTruthy();
  });

  it('should return weather of city', inject([HttpTestingController,
    WeatherDataService], (httpMock: HttpTestingController, service: WeatherDataService) => {
      const q = 'toronto';

      // Call the service
      service.getWeatherData(q).subscribe((data) => {
        expect(data.name).toBe('Toronto');
        // expect(data.id).toBe();

        // set expectation for HttpClient mock
        const req = httpMock.expectOne('htt[://.../weather/data');
        expect(req.request.method).toEqual('GET');

        // set the fake data to returned by the Mock;
        req.flush({ data: '' });
      });
    }));
});
