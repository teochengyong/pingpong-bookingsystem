import { Component } from '@angular/core';
import { User } from '../../shared/user';
import { SharedService } from '../../shared/sharedService';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-core-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent{
  user = new User();
  constructor(
    private sharedService: SharedService,
    private toastr: ToastsManager
  ) {}

  ngOnInit(): void {
    this.sharedService.userChangedBroadcast.subscribe((user: User) => {
      this.user = user;
    });
  }

  onUserClicked(event: Event): void {
    event.preventDefault();
  }

  login(): void {
    this.sharedService.loginBroadcast.next({
      visible: true
    });
  }

  logout(): void {
    this.user = new User();
    this.toastr.success('Logged out succesfully');
    this.sharedService.userChangedBroadcast.next(this.user);
  }
}
