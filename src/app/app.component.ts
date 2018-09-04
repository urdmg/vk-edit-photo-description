import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth/auth.config';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'vk-edit-photo-description';
	token: string;

	constructor(private oauthService: OAuthService,
		private router: Router) {
		this.configureWithNewConfigApi();
	}

	private configureWithNewConfigApi() {
		this.oauthService.configure(authConfig);
		this.oauthService.tokenValidationHandler = new JwksValidationHandler();
		this.oauthService.tryLogin();
	}

	ngOnInit() {
		this.token = this.oauthService.getAccessToken()
		if (this.token) {
			this.router.navigate(['/photos']);
		}
	}

}

