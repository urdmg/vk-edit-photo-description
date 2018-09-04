import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap, skipWhile } from 'rxjs/operators';

import { OAuthService } from 'angular-oauth2-oidc';
import { PhotosService } from './photos.service';


@Component({
	selector: 'app-photos',
	templateUrl: './photos.component.html',
	styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
	title = 'vk-authenticate';
	base_url = 'https://api.vk.com/method/'
	token: string;
	photos: Array<any> = [];
	httpReqestInProgress: boolean = false;
	offset = 0;

	constructor(
		private router: Router,
		private oauthService: OAuthService,
		private photosService: PhotosService,
	) {

	}

	ngOnInit() {
		this.photos = []
		this.offset = 0
		this.photosService.getPhotos(true,
			(photos) => {
				this.photos = this.photos.concat(photos);
			}
		);
	}

	public logoff() {
		this.oauthService.logOut();
		this.router.navigate(['/auth']);
	}

	public editPhoto(photo) {
		this.photosService.photoHandler(photo);
		this.router.navigate([`/photos/${photo.id}`]);
	}

	public onScrollDown(): void {
		this.photosService.getPhotos(false, (
			(photos) => {
				this.photos = this.photos.concat(photos);
			}));
	}

}