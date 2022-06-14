import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts!: any[];
  indexExpanded: any;
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    this.indexExpanded = 0
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.authService.setSession(params);
    });
    
    this.removeParams();
    this.getAccounts();
  }

  private getAccounts() {
    this.http.get('https://localhost:3000/accounts')
    .subscribe({
      next: (v: any) => {
        this.accounts = v.accounts;
      },
      error: (e) => console.error(e)
    });
  }

  private removeParams() {
    this.router.navigate([], {
      queryParams: {
        'idToken': null,
        'expiresIn': null,
      },
      queryParamsHandling: 'merge'
    })
  }

}
