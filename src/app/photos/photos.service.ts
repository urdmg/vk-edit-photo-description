import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth/auth.config';
import { tap, skipWhile } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotosService {
	base_url = 'https://api.vk.com/method/'
	access_token = this.oauthService.getAccessToken()
	photos: Array<any> = [];
	photo: any;
	httpReqestInProgress: boolean = false;
	private offset = 0;

	constructor(
		private http: HttpClient,
		private oauthService: OAuthService,
	) { 

	}

	photoHandler(photo: any) {
		// Prevent assigning of string to the object
		if (this.photo == undefined && typeof (photo) != "string") {
			this.photo = photo
			return this.photo;
		}
		if (typeof (photo) == "string") {
			if (photo == this.photo.id.toString()) {
				return this.photo;
			}
		}

		if (this.photo.id != photo.id) {
			this.photo = photo
			return this.photo
		}

		else {
			return this.photo;
		}

	}

	updateDescription(photo) {
		let url = `${this.base_url}photos.edit?access_token=${this.access_token}&v=5.84&owner_id=${photo.owner_id}&photo_id=${photo.id}&caption=${photo.text}`
		return this.http.jsonp(url, 'callback').toPromise().then(data => {
			return data
		});
	}

	getPhotos(firtst_call: boolean, saveResultsCallback: (photos) => void) {
		if (firtst_call) {
			this.offset = 0;
		}
		let count = 2
		let url = `${this.base_url}photos.getAll?access_token=${this.access_token}&v=5.84&count=${count}&offset=${this.offset}`

		return this.http.jsonp(url, 'callback').pipe(
			skipWhile(() => this.httpReqestInProgress),
			tap(() => { this.httpReqestInProgress = true; })
		).subscribe((r: any[]) => {
			this.offset += 2;
			saveResultsCallback(r['response']['items']);
			this.httpReqestInProgress = false;
		});
	}

}