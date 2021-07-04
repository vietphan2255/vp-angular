import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { PromiseUtil } from '../../shared/utils/promise.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async logout(): Promise<void> {
    const [res] = await PromiseUtil.handle(this.authService.logout());
    if (res) {
      this.router.navigate(['/login']).then();
    }
  }
}
