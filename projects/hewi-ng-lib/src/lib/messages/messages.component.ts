import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessagesService } from './messages.service';
import { Message, INFO, WARN, ERROR } from './models/message.model';

@Component({
  selector: 'hewi-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {

  msg: Message;

  private subscription: Subscription;


  constructor(private messagesService: MessagesService) { }

  ngOnInit() {

    this.msg = {
      level: INFO,
      message: 'Hallo'
    };

    this.subscription = this.messagesService.message$.subscribe(
      message => this.msg = message
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.messagesService.clear();
  }

  getClasses() {
    const result = [];
    result.push('alert');

    switch (this.msg.level) {
      case INFO:
        result.push('alert-info');
        break;
      case WARN:
        result.push('alert-warning');
        break;
      case ERROR:
        result.push('alert-danger');
        break;
    }
    return result;
  }
}
