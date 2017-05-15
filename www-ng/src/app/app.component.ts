import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component ({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
		styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private cookie:CookieService
  ) { }

}