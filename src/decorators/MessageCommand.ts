import { IMessageCommandOptions } from '../util';

export function MessageCommand(options: IMessageCommandOptions) {
	return function (target: any) {
		Reflect.defineMetadata('commands:options', options, target);
	};
}
