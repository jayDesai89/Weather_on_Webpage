
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Service
import { WeatherDataService } from './services/weatherData/weather-data.service';
// Components
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FivedayforecastComponent } from './fivedayforecast/fivedayforecast.component';
// Pipes
import { TempconverterPipe } from './pipes/tempconverter.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CheckDatePipe } from './pipes/check-date.pipe';
// Directives
import { ResizableDirective } from './directive/resizable/resizable.directive';
import { TempUnitUpdateDirective } from './directive/unitChange/temp-unit-update.directive';
import { FivedaysforecastDirective } from './directive/fiveDaysForecast/fivedaysforecast.directive';
// Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


// 3rd Party

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TempconverterPipe,
    CapitalizePipe,
    CheckDatePipe,
    SidebarComponent,
    ResizableDirective,
    HeaderComponent,
    FivedayforecastComponent,
    TempUnitUpdateDirective,
    FivedaysforecastDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GooglePlaceModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [WeatherDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
