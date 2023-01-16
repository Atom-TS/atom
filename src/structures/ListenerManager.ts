import { AtomModule, Command, Listener } from '../extendables';
import { Collection } from '@discordjs/collection';
import { resolve } from 'path';

export class ListenerManager extends AtomModule {
	components: Collection<string, Listener<any>> = new Collection<string, Listener<any>>();

	public async loadAllEvents() {
		for (const [eventName, event] of this.components) {
			// @ts-ignore
			console.log(this._events);
			event[event.type!](eventName, event.exec);
			// @ts-ignore
			console.log(this._events);
		}
	}

	public async addMultipleIn(path: string, options: { subdirectories?: boolean } = {}) {
		options = Object.assign({ subdirectories: true }, options);

		const files: Array<string> = await this._getFiles(path, options.subdirectories);

		for (let file of files) {
			if (!['js', 'ts'].includes(file.split('.')[1])) continue;

			const filepath = resolve(path, file);

			try {
				let importedListener = new (require(filepath).default)();

				if (importedListener instanceof Listener) {
					this.components.set(importedListener.event, importedListener);
				}
			} catch (e: any) {
				throw new Error(e);
			}
		}
		setImmediate(() => {
			this.emit('commandsLoaded', true);
		});
	}
}
