import { Component } from '@angular/core';
import { NavComponent }  from './core/nav/nav.component';

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}
