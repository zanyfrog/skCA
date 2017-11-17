export class Message {
    id: number;
    actionId: number;
    date: number; // change to Date 
    from: string;
    text: string;
    isRead: boolean;
    replies: Reply[] = [];
}

export class Reply {
    id: number;
    date: number; // change to Date
    from: string;
    text: string;
    isRead: boolean
}

export class UserState {
    shownMsgs: number[] = [];
    drafts: any[] = [];
}