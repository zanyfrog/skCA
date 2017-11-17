import { ActionDTO, ActionStatus, ActionType} from '../classes/classes';

export class ActionObject {

	public id: number;
	public date: Date;
	public action: string;
	public status: ActionStatus;
	public completed: boolean;
	public type: ActionType;

    constructor(obj: ActionDTO ) {
		this.id = obj.id;
		this.date = obj.date;
		this.action = obj.action;
		this.status = obj.status;
		this.completed = obj.completed;
		this.type = obj.type;
    }
}