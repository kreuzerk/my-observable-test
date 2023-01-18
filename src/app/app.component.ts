import {Component} from '@angular/core';
import {MyObservable} from "./my-observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tick$ = MyObservable.tick();
  renderIt = false
}
