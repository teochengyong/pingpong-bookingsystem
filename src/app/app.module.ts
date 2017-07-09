import { NgModule }      from '@angular/core';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdListModule,
  MdCardModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { NavComponent }  from './core/nav/nav.component';
import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdListModule,
    MdCardModule
  ],
  declarations: [
    AppComponent,
    NavComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
