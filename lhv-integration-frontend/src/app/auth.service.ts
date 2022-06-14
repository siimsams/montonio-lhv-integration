import { Injectable } from '@angular/core';
import * as moment from "moment";
import { Emitters } from './emitters/emitters';
import { of, Subscription } from "rxjs";
import { delay } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';



@Injectable({
    providedIn: "root"
})
export class AuthService {
    tokenSubscription = new Subscription()
    timeout: number = 0;

    constructor(private router: Router, private jwtHelper: JwtHelperService) {
        if (localStorage.getItem("id_token")) {
            this.timeout = this.jwtHelper.getTokenExpirationDate(localStorage.getItem("id_token")!)!.valueOf() - new Date().valueOf();
            this.expirationCounter(this.timeout);
        }
    }
          
    setSession(authResult: any) {
        if (authResult && authResult.idToken) {
            localStorage.setItem('id_token', authResult.idToken);
            this.timeout = this.jwtHelper.getTokenExpirationDate(authResult.idToken)!.valueOf() - new Date().valueOf();
            this.expirationCounter(this.timeout);
        }

        Emitters.authEmitter.emit(this.isLoggedIn());
    }
    
    routeToAccounts() {
        if (this.isLoggedIn()) this.router.navigate(["/accounts"]);
    }

    logout() {
        console.debug('LOGOUT TRIGGERED');
        localStorage.removeItem("id_token");
        Emitters.authEmitter.emit(false);
        this.router.navigate([""]);
    }

    public isLoggedIn(): boolean {
        return localStorage.getItem("id_token") ? moment().isBefore(this.getExpiration()) : false;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        return moment(this.jwtHelper.getTokenExpirationDate(localStorage.getItem("id_token")!)!.valueOf());
    }    

    expirationCounter(timeout: number) {
        this.tokenSubscription.unsubscribe();
        this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe(() => {
          console.debug('EXPIRED TOKEN!');
          this.logout();
        });
      }
}
