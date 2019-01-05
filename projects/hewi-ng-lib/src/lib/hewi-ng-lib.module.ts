import { NgModule } from '@angular/core';
import { HewiNgLibComponent } from './hewi-ng-lib.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HewiNgLibComponent, HeaderComponent],
  imports: [
  ],
  exports: [HewiNgLibComponent, HeaderComponent]
})
export class HewiNgLibModule { }
