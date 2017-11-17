
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { ApiService } from '../services/services';
import { Message, Reply, UserState } from '../classes/classes';

@Injectable()
export class MessageService {

	messageList: Message[];
	userState: UserState = new UserState();

	constructor(private apiService: ApiService) {
		this.getMessagesFromServer();
	}

	getMessagesFromServer() {
		this.messageList = this.apiService.getMessages();
		this.orderByDate();
	}

	getMessagesLocal() {
		this.orderByDate();
		return this.messageList;
	}

	addMessage(msg: Message) { // server will return the ID of new message so the list can be updated
		this.messageList.push(msg);
		this.orderByDate();
		return this.messageList;
	}

	addReply(msg: Message, reply: Reply) {
		let index = _.findKey(this.messageList, { id: msg.id });
		this.messageList[index].replies.push(reply);
		this.orderByDate();
		return this.messageList;
	}

	getNumberNewMessagesAll() {
		let result = [];
		_.each(this.messageList, function (message) {
			result.push(message);
			_.each(message.replies, function (reply) {
				result.push(reply);
			});
		});
		let count = _
			.chain(result)
			.filter({ 'isRead': false })
			.size()
			.value();
		return count;
	}

	getUserState() {
		return this.userState;
	}

	setUserState(state: UserState) {
		this.userState = state;
		console.log(this.userState);
	}

	orderByDate() {
		this.messageList = _.orderBy(this.messageList, ['date'], ['desc']);
		_.each(this.messageList, function (message) {
			message.replies = _.orderBy(message.replies, ['date'], ['desc'])
		});
	}
}
