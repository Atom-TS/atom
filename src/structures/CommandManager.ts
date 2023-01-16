import { AtomModule, Command } from '../extendables';
import { Collection } from '@discordjs/collection';
import { resolve } from 'path';
import { ICommandManagerEvents } from '../util';

export declare interface CommandManager {
	emit<U extends keyof ICommandManagerEvents>(event: U, ...args: ICommandManagerEvents[U]): boolean;
}

export class CommandManager extends AtomModule {
	components: Collection<string, Command> = new Collection<string, Command>();

	public async addMultipleIn(path: string, options: { subdirectories?: boolean } = {}) {
		options = Object.assign({ subdirectories: true }, options);

		const files: Array<string> = await this._getFiles(path, options.subdirectories);

		for (let file of files) {
			if (!['js', 'ts'].includes(file.split('.')[1])) continue;

			const filepath = resolve(path, file);

			try {
				let importedCommand = new (require(filepath).default)();
				if (importedCommand instanceof Command) {
					this.components.set(importedCommand.name, importedCommand);
				}
			} catch (e: any) {
				throw new Error(e);
			}
		}
		setImmediate(() => {
			this.emit('commandsLoaded', true);
		});
	}

	// Note skipping check will likely lead to duplicate command entries if they are slash commands.
	async loadAllCommands(skipCheck: boolean) {}
}
