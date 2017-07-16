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

  signup(event: Event, form: NgForm): void {
    event.preventDefault()
    const avatars = [
      'boy-1.svg', 'boy.svg', 'girl-1.svg', 'girl.svg', 'man-1.svg',
      'man-2.svg', 'man-3.svg', 'man-4.svg', 'man.svg'
    ];
    this.userService.add({
      name: form.value.name.trim(),
      avatar: avatars[parseInt((Math.random() * 9).toFixed(0), 10)]
    }).then( usr => {
      this.toastr.success(`User with the name, ${usr.name} created successfully.`);
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
