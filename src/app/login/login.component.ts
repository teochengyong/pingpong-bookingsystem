import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  visible: boolean = true;
  close(event:Event): void {
    this.visible = false;
  }
}
