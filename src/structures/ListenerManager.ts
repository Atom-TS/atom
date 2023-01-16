import { AtomModule, Listener } from '../extendables';
import { Collection } from '@discordjs/collection';

export class ListenerManager extends AtomModule {
	components: Collection<number, Listener> = new Collection<number, Listener>();
}
