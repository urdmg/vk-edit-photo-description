import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PhotosService } from './photos.service';

@Component({
	selector: 'edit-photo',
	templateUrl: './edit_photo.component.html',
	styleUrls: ['./photos.component.css']
})
export class EditPhotoComponent implements OnInit {
	photo: any;
	base_url = 'https://api.vk.com/method/'
	id: number;

	constructor(
		private router: Router,
		private photosService: PhotosService,
		private route: ActivatedRoute
	) {
		this.route.params.subscribe(params => this.id = params.id);
	}

	ngOnInit() {
		this.photo = this.photosService.photoHandler(this.id);
		if (this.photo == null) {
			this.router.navigate(['/photos']);
		}
	}

	public save() {
		this.photosService.updateDescription(this.photo).then(
			(data)=> {
				if(data['response']==1){
					this.router.navigate(['/photos']);
				}
			}
		)
	}

	public cancel() {
		this.photosService.photoHandler(this.photo);
		this.router.navigate(['/photos']);
	}
}
