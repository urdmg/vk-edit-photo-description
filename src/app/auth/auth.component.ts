import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Component, OnInit } from '@angular/core';
import { tap, skipWhile } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	token: string;
	constructor(private oauthService: OAuthService,
		private router: Router) {
		this.configureWithNewConfigApi();
	}

	ngOnInit() {
		this.token = this.oauthService.getAccessToken()
		if (this.token) {
			this.router.navigate(['/photos']);
		}
	}

	private configureWithNewConfigApi() {
		this.oauthService.configure(authConfig);
		this.oauthService.tokenValidationHandler = new JwksValidationHandler();
		this.oauthService.tryLogin();
	}

	public login() {
		this.oauthService.initImplicitFlow();
	}

	// public logoff() {
	// 	this.oauthService.logOut();
	// 	// this.router.navigate(["Your actualComponent"]));
	// }

}
