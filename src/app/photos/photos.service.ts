import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth/auth.config';
import { tap, skipWhile } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotosService {
	base_url = 'https://api.vk.com/method/'
	access_token = this.oauthService.getAccessToken()
	public photos: Array<any> = [];
	public photo: any;
	public httpReqestInProgress: boolean = false;
	private offset = 0;

	constructor(private http: HttpClient,
		private oauthService: OAuthService, ) { }

	photoHandler(photo: any) {
		// if "photo" type is set to any somehow 
		// even if number have been sent type 
		// of photo retrieved as string
		if (this.photo == undefined && typeof (photo) != "string") {
			this.photo = photo
			return this.photo;
		}
		if (typeof (photo) == "string") {
			if (photo == this.photo.id.toString()) {
				return this.photo;
			}
		} 

		if (this.photo.id != photo.id){
			this.photo = photo
			return this.photo
		}

		else {
			return this.photo;
		}

	}

	updateDescription(photo) {
		let url = `${this.base_url}photos.edit?access_token=${this.access_token}&v=5.84&owner_id=${photo.owner_id}&photo_id=${photo.id}&caption=${photo.text}`
		return this.http.jsonp(url, 'callback').pipe(
			skipWhile(() => this.httpReqestInProgress),
			tap(() => { this.httpReqestInProgress = true; })
		).subscribe((r: any[]) => {
			console.log(r)
			this.httpReqestInProgress = false;
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
			// Is it important to create object that will correlate response?
			// otherwise I have an error <Property "response" does not exist on type any[]>
			saveResultsCallback(r.response.items);
			this.httpReqestInProgress = false;
		});
	}


}