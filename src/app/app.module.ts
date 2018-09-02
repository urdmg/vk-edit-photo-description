import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './photos/photos.component';
import { PhotosService } from './photos/photos.service';
import { EditPhotoComponent } from './photos/edit_photo.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.config';

const routes: Routes = [
	{
		path: '',
		redirectTo:'/auth', 
		pathMatch : 'full'
	},
	{
		path: 'auth',
		component: AuthComponent
	},
	{
		path: 'photos',
		component: PhotosComponent,
		canActivate:[AuthGuard]
	},
	{
		path: 'photos/:id',
		component: EditPhotoComponent,
		canActivate:[AuthGuard]
	}
];

@NgModule({
	declarations: [
		AppComponent,
		PhotosComponent,
		EditPhotoComponent,
		AuthComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		HttpClientJsonpModule,
		NgxInfiniteScrollerModule,
		FormsModule,
		OAuthModule.forRoot(),
		RouterModule.forRoot(routes)
	],
	providers: [AuthGuard, PhotosService],
	bootstrap: [AppComponent]
})
export class AppModule { }

