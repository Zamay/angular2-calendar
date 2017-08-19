import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NavModule}      from './nav/nav.module';
import {HeaderModule}   from './header/header.module';
import {CommonModule} from "@angular/common";
import {MainModule} from "./main/main.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NavModule,
    MainModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
