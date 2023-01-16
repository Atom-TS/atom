import { EventEmitter } from 'events';
import { Collection } from '@discordjs/collection';
import { Dirent, readdir } from 'fs';
export class AtomModule extends EventEmitter {
	// Components will be the different Command/Listener classes stored
	public components: Collection<any, any> = new Collection<any, any>();
	protected async _getFiles(directory: string, subdirectories?: boolean): Promise<Array<string>> {
		if (subdirectories) {
			const dirents: Array<Dirent> = await new Promise((resolve, reject) => {
				readdir(directory, { withFileTypes: true }, (err: Error | null, files: Array<Dirent>) => {
					if (err) reject(err);
					else resolve(files);
				});
			});

			const names: Array<string> = [];
			for (let folder of dirents.filter((dirent) => dirent.isDirectory())) {
				const files = await this._getFiles(`${directory}/${folder.name}`, subdirectories);
				for (let name of files) {
					names.push(`${folder.name}/${name}`);
				}
			}

			for (let file of dirents.filter((dirent) => dirent.isFile())) {
				names.push(file.name);
			}
			return names;
		} else {
			return await new Promise((resolve, reject) => {
				readdir(directory, (err: Error | null, files: Array<string>) => {
					if (err) reject(err);
					else resolve(files);
				});
			});
		}
	}
}
