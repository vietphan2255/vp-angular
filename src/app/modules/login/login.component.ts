import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';
import { PromiseUtil } from '../../shared/utils/promise.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    const [res, error] = await PromiseUtil.handle(
      this.loginService.login({ username: 'username', password: 'password', rememberMe: true })
    );
    if (res) {
      this.router.navigate(['/']).then();
    }
  }
}
