import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UnicornComponent } from './unicorn/unicorn.component';
import { UnicornListComponent } from './unicorn/unicorn-list/unicorn-list.component';
import { SharedModule } from './shared/shared.module';
import { UnicornFormComponent } from './unicorn/unicorn-form/unicorn-form.component';
import { UnicornColorComponent } from './unicorn/unicorn-color/unicorn-color.component';
import { FormsModule } from '@angular/forms';
import { UnicornFormReproductionComponent } from './unicorn/unicorn-form-reproduction/unicorn-form-reproduction.component';
import { PlaygroundComponent } from './unicorn/playground/playground.component';

@NgModule({
  declarations: [
    AppComponent,
    UnicornComponent,
    UnicornListComponent,
    UnicornFormComponent,
    UnicornColorComponent,
    UnicornFormReproductionComponent,
    PlaygroundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
