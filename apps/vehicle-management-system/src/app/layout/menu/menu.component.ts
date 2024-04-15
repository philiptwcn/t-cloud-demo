import { environment } from './../../../environments/environment.development';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '@tcloud/auth';

interface MenuItem {
  label: string;
  icon: string;
  activated: boolean;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(private authService: AuthenticationService) {}
  items: MenuItem[] = [
    {
      label: 'Driver',
      icon: 'pi pi-users',
      activated: true,
    },
    {
      label: 'Vehicle',
      icon: 'pi pi-car',
      activated: false,
    },
    {
      label: 'Report',
      icon: 'pi pi-chart-bar',
      activated: false,
    },
  ];

  logout() {
    this.authService.logout(environment.storageKey);
  }
}
