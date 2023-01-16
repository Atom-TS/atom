import { EventEmitter } from 'events';

export class Command extends EventEmitter {
	public name: string = '';
	public description: string = '';
	public nsfw?: boolean;
	public guildOnly?: boolean;
	constructor() {
		super();
	}
}
