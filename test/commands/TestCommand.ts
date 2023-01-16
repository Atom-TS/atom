import { Command, SlashCommand } from '../../src';

@SlashCommand({
	name: 'test',
	description: 'testing',
})
export default class TestCommand extends Command {
	constructor() {
		super();
	}
}
