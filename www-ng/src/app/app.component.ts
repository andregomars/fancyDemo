import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component ({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
		styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: string;

  constructor(
    private cookie:CookieService
  ) { }

  ngOnInit(): void {
    this.user = this.cookie.get('ioc_loggedin');
  }
}