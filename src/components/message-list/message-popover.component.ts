import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ViewController } from 'ionic-angular';

import { AuthService, MessageService } from '../../services/services';
import { Message, Reply, UserState } from '../../classes/classes';
import * as _ from 'lodash';

@Component({
  selector: 'message-popover',
  templateUrl: 'message-popover.component.html'
})
export class MessagePopoverComponent {

  currentUser: string;
  messageList: any[] = [];
  msgForm: FormGroup;
  newMessageCount: number = 0;
  shownMsgs: number[];
  userState: UserState;


  constructor(
    public auth: AuthService,
    public fb: FormBuilder,
    public msgService: MessageService,
    public zone: NgZone,
    public viewCtrl: ViewController) {

    this.messageList = this.msgService.getMessagesLocal();
    this.currentUser = this.auth.getUser();
    this.userState = this.msgService.getUserState();
    this.createForm();
  }

  createForm() {
    this.shownMsgs = this.userState.shownMsgs;
    let newMsgDraft = _.find(this.userState.drafts, 'newMsgText');
    this.msgForm = this.fb.group({
      newMsgText: newMsgDraft ? newMsgDraft.newMsgText : null
    });
    for (let msg of this.messageList) {
      let newReplyDraft = _.find(this.userState.drafts, 'reply_' + msg.id);
      this.msgForm.addControl('reply_' + msg.id, new FormControl(newReplyDraft ? newReplyDraft['reply_' + msg.id] : null));
    }
  }

  closeMessagePopover() {
    this.viewCtrl.dismiss();
  }

  toggleMsg(group) {
    if (this.isMsgShown(group)) {
      _.pull(this.shownMsgs, group);
    } else {
      this.shownMsgs.push(group);
    }
  }

  isMsgShown(group) {
    let val = _.includes(this.shownMsgs, group);
    return val;
  }

  getNumberNewMessages() {
    let count = 2;
    this.newMessageCount = count;
  }

  msgReply(event, msg) {
    let msgText = this.msgForm.value['reply_' + msg.id];
    if (msgText != '') {
      let newReply: Reply = {
        id: 0, // will be defined by server later
        from: this.auth.getUser(),
        date: Date.now(),
        text: msgText,
        isRead: false
      }
      this.messageList = this.msgService.addReply(msg, newReply);
      this.msgForm.controls['reply_' + msg.id].setValue(null);
    }
  }

  newMsg(event) {
    let msgText = this.msgForm.value.newMsgText;
    if (msgText != '') {
      let last = _.last(this.messageList)
      let lastId = last.id;
      let newMsg: Message = {
        id: lastId + 1, // will be later defined by server
        actionId: 1,
        from: this.auth.getUser(),
        date: new Date().getTime(),
        text: msgText,
        isRead: false,
        replies: [] = [],
      }
      this.messageList = this.msgService.addMessage(newMsg);
      this.msgForm.addControl('reply_' + newMsg.id, new FormControl());
      this.msgForm.controls['newMsgText'].setValue(null);
      console.log(Date.now());
       console.log(newMsg.date);
    }
  }

  setUserState() {
    this.userState.drafts = [];
    for (var ctrl in this.msgForm.controls) {
      let replyDraft = { [ctrl]: this.msgForm.controls[ctrl].value }
      this.userState.drafts.push(replyDraft)
    }
    this.msgService.setUserState(this.userState);
  }

}
