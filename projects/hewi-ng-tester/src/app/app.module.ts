import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HewiNgLibModule } from 'hewi-ng-lib';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HewiNgLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
