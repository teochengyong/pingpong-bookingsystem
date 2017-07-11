import { Component } from '@angular/core';
import { User } from '../../shared/User';

@Component({
  selector: 'app-core-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent{
  user = new User();
}
