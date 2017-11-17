import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { MessageService } from '../../services/services';

import { MessagePopoverComponent } from '../../components/components';

@Component({
  selector: 'message-list-all',
  templateUrl: 'message-list-all.component.html'
})
export class MessageListAllComponent {

  newMessageCount: number = 0;

  constructor(
    public msgService: MessageService,
    public popoverCtrl: PopoverController) {
      this.newMessageCount = this.msgService.getNumberNewMessagesAll();
  }

  openMessagePopover(event) {
    let popover = this.popoverCtrl.create(MessagePopoverComponent, {}, { cssClass: 'messagePopover' });
    popover.present({
      ev: event
    });
    popover.onDidDismiss(data => { });
  }
}
