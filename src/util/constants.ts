import { ClientEvents } from 'discord.js';

export interface ICommandManagerEvents {
	commandsLoaded: [loaded: boolean];
	commandsCleared: [cleared: boolean];
}

export interface IMessageCommandOptions {
	name: string;
	description: string;
	nsfw?: boolean;
	guildOnly?: boolean;
}

export interface ISlashCommandOptions extends IMessageCommandOptions {
	ephemeral?: boolean;
}

export interface IAtomClientOptions {}

export type UnionEvents = keyof ICommandManagerEvents | keyof ClientEvents;
export type IntersectedEvents = ICommandManagerEvents & ClientEvents;

export interface IEventOptions {
	event: UnionEvents | string;
	type?: 'on' | 'once';
}
