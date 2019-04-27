import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'projects/hewi-ng-lib/src/public_api';
import { ModalService } from 'projects/hewi-ng-lib/src/public_api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'hewi-ng-tester';

  dialogTitle = ''

  btnDisabled = false;

  showDialog: boolean;


  constructor(private messagesService: MessagesService, private modalService: ModalService) { }

  ngOnInit() {
    this.messagesService.message$.pipe(
      filter(
        _msg => !!undefined
      )
    ).subscribe(
      msg => console.log('message erhalten: ' + msg.message)
    );
  }


  openInfo() {
    console.log('click info');
    this.messagesService.info('This is a veeeerrrrrry loooooong Info. Everything is OK.');
  }


  openWarning() {
    this.messagesService.warn('This is a veeeerrrrrry loooooong Warning. Be careful!!!');
  }

  openError() {
    this.messagesService.error(' +++ OMG +++  Please reinstall universe and reboot.');
  }


  onClickOpenModal() {
    this.openModal();
  }

  private openModal(): void {
    this.showDialog = true;
    this.modalService.open();
  }


  closeModal() {
    this.modalService.close();
  }


}
