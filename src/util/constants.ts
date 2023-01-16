export interface ICommandManagerEvents {
	commandsLoaded: (loaded: boolean) => void;
	commandsCleared: (cleared: boolean) => void;
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
