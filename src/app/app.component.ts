import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth/auth.config';
import { Component } from '@angular/core';
import { tap, skipWhile } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'vk-edit-photo-description';
	base_url = 'https://api.vk.com/method/'
	token: string;
	public photos: Array<any> = [];
	public httpReqestInProgress: boolean = false;
	private offset = 0;


	// name: string;
	constructor(private oauthService: OAuthService,
		private http: HttpClient,
		private router : Router) {
		this.configureWithNewConfigApi();
	}

	private configureWithNewConfigApi() {
		this.oauthService.configure(authConfig);
		this.oauthService.tokenValidationHandler = new JwksValidationHandler();
		this.oauthService.tryLogin();
	}

	public login() {
		this.oauthService.initImplicitFlow();
	}

	public logoff() {
		this.oauthService.logOut();
		// this.router.navigate(["Your actualComponent"]));
	}


	ngOnInit() {
		// this.getPhotos(
		// 	(photos) => {
		// 		this.photos = this.photos.concat(photos);
		// 	}
		// );
		this.token = this.oauthService.getAccessToken()
		if (this.token) {
			this.router.navigate(['/photos']);
		}
	}


	public onScrollDown(): void {
		this.getPhotos(
			(photos) => {

				this.photos = this.photos.concat(photos);
			}
		);
	}

	private getPhotos(saveResultsCallback: (photos) => void) {
		let access_token = this.oauthService.getAccessToken()
		let count = 1
		let url = `${this.base_url}photos.getAll?access_token=${access_token}&v=5.84&count=${count}&offset=${this.offset}`

		return this.http.jsonp(url, 'callback').pipe(
			skipWhile(() => this.httpReqestInProgress),
			tap(() => { this.httpReqestInProgress = true; })
		).subscribe((r: any[]) => {
			this.offset++;
			// saveResultsCallback(r.response.items);
			this.httpReqestInProgress = false;
		});
	}

	dataChanged(photo) {
		let access_token = this.oauthService.getAccessToken()
		let url = `${this.base_url}photos.edit?access_token=${access_token}&v=5.84&owner_id=${photo.owner_id}&photo_id=${photo.id}&caption=${photo.text}`
		return this.http.jsonp(url, 'callback').subscribe((result) => {
			console.log(result)
		});
	}

}

 // get_account_info(token, count, offset) {
 //    	let tkn = token
 //    	let url = `${this.base_url}photos.getAll?access_token=${tkn}&v=5.84&count=${count}&offset=${offset}`
 //  		return this.http.jsonp(url, 'callback');
	// }

    // public get name() {
    //     let claims = this.oauthService.getIdentityClaims();
    //     if (!claims) return null;
    //     return claims;
    // }