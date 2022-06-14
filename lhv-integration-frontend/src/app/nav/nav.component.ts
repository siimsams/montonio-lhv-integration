import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Emitters} from '../emitters/emitters'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  auth: boolean;

  constructor(private authService: AuthService) {
    this.auth = false;
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {this.auth = auth}
    );
  }

  logout(): void {
    this.authService.logout()
  }
}
