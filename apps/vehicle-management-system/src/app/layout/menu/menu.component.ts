import { environment } from './../../../environments/environment.development';
import { AfterContentChecked, Component } from '@angular/core';
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
export class MenuComponent implements AfterContentChecked {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngAfterContentChecked(): void {
    this.items.map(
      (item) =>
        (item.activated =
          this.router.url.split('/').pop() === item.route ? true : false)
    );
  }

  /**
   * Navigate by clicked link
   *
   * @param {string} link
   * @memberof MenuComponent
   */
  navigate(link: string): void {
    this.router.navigate([link], { relativeTo: this.route });
  }

  /**
   * Logout
   * Clear stored key and navigate to login page
   *
   * @memberof MenuComponent
   */
  logout(): void {
    this.authService.logout(environment.storageKey);
    this.router.navigate(['login']);
  }
}
