import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { SharedService } from './services/shared.service';
import {AccommodationModule} from "./accommodation/accommodation.module";
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {Interceptor} from "./infrastructure/auth/interceptor";
import { AuthModule } from './infrastructure/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { DatePipe } from '@angular/common';
import {CommentsModule} from "./comments/comments.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
	  AccommodationModule,
    UserModule,
    HttpClientModule,
    AuthModule,
    SharedModule,
	  CommentsModule
  ],

  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,

    },
    SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
