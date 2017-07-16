import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdListModule,
  MdCardModule,
  MdInputModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdMenuModule,
  MdDialogModule
} from '@angular/material';

import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/in-memory-data.service';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions} from 'ng2-toastr/ng2-toastr';
import { CustomToastOptions } from './shared/toastr-options';

import { NavComponent }  from './core/nav/nav.component';
import { AppComponent }  from './app.component';
import { BookingListComponent }  from './booking-list/booking-list.component';
import { BookingComponent }  from './booking/booking.component';
import { BookingsComponent }  from './bookings/bookings.component';
import { BookingDialogComponent }  from './booking-dialog/booking-dialog.component';
import { LoginComponent }  from './login/login.component';

import { BookingService } from './shared/booking.service';

import { OrderByDatePipe } from './shared/orderByDate.pipe';


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
    BrowserAnimationsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    ToastModule.forRoot(),
    MdMenuModule,
    MdDialogModule
  ],
  declarations: [
    AppComponent,
    NavComponent,
    BookingListComponent,
    BookingComponent,
    BookingsComponent,
    LoginComponent,
    OrderByDatePipe,
    BookingDialogComponent
  ],
  entryComponents: [BookingDialogComponent],
  providers: [
    BookingService,
    {
      provide: ToastOptions, useClass: CustomToastOptions
    },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
