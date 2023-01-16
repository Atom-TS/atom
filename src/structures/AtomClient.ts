import { Collection } from '@discordjs/collection';
import { AtomModule } from '../extendables';
import * as Discord from 'discord.js';
import { ClientOptions } from 'discord.js';
import { IAtomClientOptions } from '../util';

declare module 'discord.js' {
	interface Client {
		// Modules will be the base class of many things, events, commands (both slash and message based), etc
		modules: Collection<number, AtomModule>;
	}
	interface ClientOptions extends IAtomClientOptions {}
}

export class AtomClient extends Discord.Client {
	public modules: Collection<number, AtomModule> = new Collection<number, AtomModule>();
	constructor(token: string, options: ClientOptions) {
		super(options);
		this.token = token;
	}

	public async connect() {
		await this.login(this.token!);
	}
}
