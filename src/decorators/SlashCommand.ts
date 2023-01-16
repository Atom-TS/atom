import { ISlashCommandOptions } from '../util';

export function SlashCommand(options: ISlashCommandOptions) {
	return function (target: any) {
		Reflect.defineMetadata('commands:options', options, target);
	};
}
