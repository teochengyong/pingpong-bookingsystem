import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdListModule,
  MdCardModule,
  MdInputModule,
  MdDatepickerModule,
  MdNativeDateModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { NavComponent }  from './core/nav/nav.component';
import { AppComponent }  from './app.component';
import { BookingListComponent }  from './booking-list/booking-list.component';
import { BookingComponent }  from './booking/booking.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdListModule,
    MdCardModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    NavComponent,
    BookingListComponent,
    BookingComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
