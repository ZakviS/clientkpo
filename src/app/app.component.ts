import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nameComponent = 'Max';
  hello = '';

  constructor(public translate: TranslateService) {
    this.translate.stream('HOME.TITLE').subscribe(val => {
      this.hello = val;
    });
  }

  onChangeName(name: string) {
    this.nameComponent = name;
  }
}
