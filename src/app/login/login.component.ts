import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './shared/user.service';
import { User } from '../shared/user';
import { SharedService } from '../shared/sharedService';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent {
  visible: boolean = false;
  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private toastr: ToastsManager
  ) {}

  ngOnInit(): void {
    this.sharedService.loginBroadcast
      .subscribe(options =>  this.visible = options.visible);
  }

  login(event: Event, form: NgForm): void {
    event.preventDefault()
    const user = new User();
    user.name = form.value.name.trim();
    this.userService.getUser(user).then((usr) => {
      this.close();
      this.sharedService.userChangedBroadcast.next(usr);
    }).catch((error) => {
      this.toastr.error(error.message);
    });
  }

  close(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.visible = false;
  }
}
