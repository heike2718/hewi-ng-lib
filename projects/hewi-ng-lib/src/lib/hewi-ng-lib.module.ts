import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MessagesComponent } from './messages/messages.component';
import { ModalComponent } from './modal/modal.component';
import { ModalOpenOnClickDirective } from './modal/modal-open-on-click.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    MessagesComponent,
    ModalComponent,
    ModalOpenOnClickDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    MessagesComponent,
    ModalComponent,
    ModalOpenOnClickDirective
  ]
})
export class HewiNgLibModule { }
