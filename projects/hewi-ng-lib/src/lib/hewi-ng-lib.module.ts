import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MessagesComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    MessagesComponent,
  ]
})
export class HewiNgLibModule { }
