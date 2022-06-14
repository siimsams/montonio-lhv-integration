import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.authService.routeToAccounts();
  }

  ngOnInit(): void {

  }

  auth(): boolean {
    window.location.href = "https://localhost:3000/auth/lhv";
    return false;
  }
}
