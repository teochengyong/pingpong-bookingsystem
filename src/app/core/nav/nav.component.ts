import { Component } from '@angular/core';
import { User } from '../../shared/user';
import { SharedService } from '../../shared/sharedService';

@Component({
  selector: 'app-core-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent{
  user = new User();
  constructor(
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.userChangedBroadcast.subscribe((user: User) => {
      this.user = user;
    });
  }
}
