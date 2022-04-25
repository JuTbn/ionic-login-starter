import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthenticationService } from './../services/authentication.service';

@Injectable({
  providedIn: 'root'
})

/** 
* Secure the internal pages of the app
*/
export class AuthGuard implements CanLoad {
  
  constructor(private authService: AuthenticationService, private router: Router) { }
  canLoad(): Observable<boolean>{
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigateByUrl('/login')
          return false;
        }
      })
      );
    }
    
    
    // route: Route,
    // segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true
  }
  