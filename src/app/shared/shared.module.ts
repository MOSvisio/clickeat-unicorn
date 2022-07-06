import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { UnicornGenderPipe } from './pipes/UnicornGenderPipe';



@NgModule({
  declarations: [
    ModalComponent,
    UnicornGenderPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    UnicornGenderPipe
  ]
})
export class SharedModule { }
