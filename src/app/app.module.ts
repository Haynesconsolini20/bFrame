import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { TwittercomponentComponent } from './twittercomponent/twittercomponent.component';

@NgModule({
  declarations: [
    AppComponent,
    TwittercomponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
