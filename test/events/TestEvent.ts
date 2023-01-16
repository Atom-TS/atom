import { AtomClient, Listener } from '../../src';
import { Client } from 'discord.js';

export default class TestEvent extends Listener<'ready'> {
	constructor() {
		super({
			event: 'ready',
		});
	}
	async exec(client: Client) {
		console.log(`${client.user?.username} has come online`);
	}
}
