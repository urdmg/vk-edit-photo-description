import { Component, OnInit } from '@angular/core';
import { PhotosService } from './photos.service';
import { Router } from '@angular/router';
import {ActivatedRoute} from "@angular/router";

@Component({
	selector: 'edit-photo',
	templateUrl: './edit_photo.component.html',
	styleUrls: ['./photos.component.css']
})
export class EditPhotoComponent implements OnInit {
	photo: any;
	base_url = 'https://api.vk.com/method/'
	id: number;
	constructor(private router : Router,
		private photosService: PhotosService,
		private route: ActivatedRoute
	) {
	this.route.params.subscribe( params => this.id = params.id ); 
	}

	ngOnInit() {
		this.photo = this.photosService.photoHandler(this.id);
		if (this.photo == null) {
			this.router.navigate(['/photos']);
		}
	}

	save(){
		this.photosService.updateDescription(this.photo)
		this.router.navigate(['/photos']);
	}

	cancel(){
		this.photosService.photoHandler(this.photo);
		this.router.navigate(['/photos']);
	}
}

