import { EventEmitter } from 'events';

export abstract class Command extends EventEmitter {
	public name: string = '';
	public description: string = '';
	public nsfw?: boolean;
	public guildOnly?: boolean;

	async OnBeforeRun(): Promise<boolean> {
		return true;
	}

	async OnRunCancel(): Promise<boolean> {
		return true;
	}

	public exec(args: any[]) {
		throw 'Not Implemented';
	}
}
