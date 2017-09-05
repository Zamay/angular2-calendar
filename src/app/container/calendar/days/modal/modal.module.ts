import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ModalComponent } from './modal.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports:      [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [ModalComponent],
  exports:      [ModalComponent]
})
export class ModalModule { }
