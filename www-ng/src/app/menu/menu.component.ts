import { Component, OnInit } from '@angular/core';
import { MenuModule, MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-menu',
  moduleId: module.id,
  templateUrl: 'menu.component.html',
  styleUrls: [ 'menu.component.css' ]
})
export class MenuComponent implements OnInit {

    private menuItems : MenuItem[];

    ngOnInit() {
      this.menuItems = [
                {
                    label: 'BYD', 
                    url: '/fleet',
                    items: [
                      [
                            {
                                label: 'AZ01',
                                routerLink: '/vehicle/AZ01'
                            },
                            {
                                label: 'AZ02',
                                routerLink: '/vehicle/AZ02'
                            }
                         ] ]
                },
                {
                    label: 'Sports', icon: 'fa-soccer-ball-o',
                    items: [
                        [
                            {
                                label: 'Sports 1',
                                items: [{label: 'Sports 1.1'},{label: 'Sports 1.2'}]
                            },
                            {
                                label: 'Sports 2',
                                items: [{label: 'Sports 2.1'},{label: 'Sports 2.2'}]
                            },

                        ],
                        [
                            {
                                label: 'Sports 3',
                                items: [{label: 'Sports 3.1'},{label: 'Sports 3.2'}]
                            },
                            {
                                label: 'Sports 4',
                                items: [{label: 'Sports 4.1'},{label: 'Sports 4.2'}]
                            }
                        ],
                        [
                            {
                                label: 'Sports 5',
                                items: [{label: 'Sports 5.1'},{label: 'Sports 5.2'}]
                            },
                            {
                                label: 'Sports 6',
                                items: [{label: 'Sports 6.1'},{label: 'Sports 6.2'}]
                            }
                        ]
                    ]
                }
            ];
    }
}