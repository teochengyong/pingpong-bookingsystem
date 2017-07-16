import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './booking-dialog.component.html',
})

export class BookingDialogComponent {
  constructor(public dialogRef: MdDialogRef<BookingDialogComponent>) {}
}
