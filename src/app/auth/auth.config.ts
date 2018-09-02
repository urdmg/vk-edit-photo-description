import { AuthConfig } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const authConfig: AuthConfig = {

	loginUrl: 'https://oauth.vk.com/authorize',
	clientId: '6677842',
	redirectUri: 'http://localhost:4200',
	scope: 'photos, offline',
	responseType: 'token',
	requireHttps: false,
	requestAccessToken: true,
	oidc: false,

}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (sessionStorage.getItem('access_token') != null)
      return true;
      this.router.navigate(['/auth']);
      return false;
  }
}