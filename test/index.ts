import { AtomClient, CommandManager } from '../src';
import { GatewayIntentBits } from 'discord-api-types/v10';
import { join } from 'path';
import { token } from './config';

const client = new AtomClient(token, {
	intents: [GatewayIntentBits.Guilds],
});

(async () => {
	const cmdManager = new CommandManager();
	await cmdManager.addMultipleIn(join(__dirname, 'commands'), { subdirectories: true });

	cmdManager.on('commandsLoaded', (loaded) => {
		if (loaded) console.log('Loaded Commands Successfully!');
	});
})();

client.connect().catch(console.warn);
