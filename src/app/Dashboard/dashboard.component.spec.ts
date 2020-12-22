import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TempconverterPipe } from '../pipes/tempconverter.pipe';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherDataService } from '../services/weatherData/weather-data.service';
import { error } from 'protractor';


describe('Component:DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent,
        TempconverterPipe,
        CapitalizePipe],
      imports: [ReactiveFormsModule,
        FormsModule,
        MatDividerModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        HttpClientModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // Create Component and test fixture
    fixture = TestBed.createComponent(DashboardComponent);
    // Get instance of a component from the fixture
    component = fixture.componentInstance;
    // Initiate the component
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('Should check if form is generated on the template', () => {
    expect(component.findCityForm.contains('nameOfCity')).toBeTruthy();
  });

  it('Should check it makes form control required', () => {
    // Acquired - get the form control
    const control = component.findCityForm.get('nameOfCity');
    // Act - set the base value
    control.setValue('');
    // Assert
    expect(control.valid).toBeFalsy();
  });

  it('should check if field has validator set on it', () => {
    const cityNameTest = component.findCityForm.controls['nameOfCity'];
    let cityNameTestError = {};

    cityNameTestError = cityNameTest.errors || {};
    let keyRequired = 'required';

    expect(cityNameTestError[keyRequired]).toBeTruthy();
  });

  it('Should check that empty form is invalid', () => {
    expect(component.findCityForm.valid).toBeFalsy();
  });

  it('should check name of city input', () => {
    component.findCityForm.controls['nameOfCity'].setValue('Brampton');
    // let cityName = component.findCityForm.get('nameOfCity').value;
    // cityName.setValue('brampton');
    expect(component.findCityForm.value.nameOfCity).toBe('Brampton');
  });
});
