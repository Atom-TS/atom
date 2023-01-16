import { AtomClient, CommandManager, Listener, ListenerManager } from '../src';
import { GatewayIntentBits } from 'discord-api-types/v10';
import { join } from 'path';
import { token } from './config';

const client = new AtomClient(token, {
	intents: [GatewayIntentBits.Guilds],
});

(async () => {
	const cmdManager = new CommandManager();
	await cmdManager.addMultipleIn(join(__dirname, 'commands'), { subdirectories: true });

	const listenerManager = new ListenerManager();
	await listenerManager.addMultipleIn(join(__dirname, 'events'), { subdirectories: true });

	await listenerManager.loadAllEvents();
})();

client.connect().catch(console.warn);
