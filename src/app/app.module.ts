import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './component/section/section.component';
import { SharedAccordionComponent } from './shared/shared-accordion/shared-accordion.component';
import { FormsModule } from '@angular/forms';
import { SharedCheckboxComponent } from './shared/shared-checkbox/shared-checkbox.component';
import { ShareEditComponent } from './shared/share-edit/share-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    SharedAccordionComponent,
    SharedCheckboxComponent,
    ShareEditComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
