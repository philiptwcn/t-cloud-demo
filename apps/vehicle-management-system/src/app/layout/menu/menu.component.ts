import { environment } from './../../../environments/environment.development';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '@tcloud/auth';
import { ActivatedRoute, Router } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  activated: boolean;
  route: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.route.url.subscribe((value) => {
      console.log(value[value.length - 1]);
    });
  }
  items: MenuItem[] = [
    {
      label: 'Driver',
      icon: 'pi pi-users',
      activated: true,
      route: 'driver',
    },
    {
      label: 'Vehicle',
      icon: 'pi pi-car',
      activated: false,
      route: 'vehicle',
    },
    {
      label: 'Report',
      icon: 'pi pi-chart-bar',
      activated: false,
      route: 'report',
    },
  ];

  navigate(link: string) {
    this.router.navigate([link], { relativeTo: this.route });
  }

  logout() {
    this.authService.logout(environment.storageKey);
    this.router.navigate(['login']);
  }
}
