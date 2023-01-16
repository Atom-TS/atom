import { EventEmitter } from 'events';
import { AtomClient, CommandManager, ListenerManager } from '../structures';
import { IEventOptions, IntersectedEvents, UnionEvents } from '../util';

export class Listener<T extends UnionEvents> extends EventEmitter {
	private CommandManager: CommandManager;
	private ListenerManager: ListenerManager;
	private AtomClient: AtomClient;
	private events: Record<string, Function | Function[]>;

	public event: string = '';
	public type?: 'on' | 'once' = 'on';
	constructor({ event, type = 'on' }: IEventOptions) {
		super();

		this.event = event;
		this.type = type;

		this.CommandManager = new CommandManager();
		this.ListenerManager = new ListenerManager();
		this.AtomClient = new AtomClient('', { intents: [] });
		this.events = {};
		Object.defineProperty(this.CommandManager, '_eventsCount', {
			// @ts-expect-error _eventsCount is private
			get: (_) => this._eventsCount,
			// @ts-expect-error _eventsCount is private
			set: (x) => (this._eventsCount = x),
		});

		Object.defineProperty(this.ListenerManager, '_eventsCount', {
			// @ts-expect-error _eventsCount is private
			get: (_) => this._eventsCount,
			// @ts-expect-error _eventsCount is private
			set: (x) => (this._eventsCount = x),
		});

		Object.defineProperty(this.AtomClient, '_eventsCount', {
			// @ts-expect-error _eventsCount is private
			get: (_) => this._eventsCount,
			// @ts-expect-error _eventsCount is private
			set: (x) => (this._eventsCount = x),
		});

		Object.defineProperty(this.CommandManager, 'removeAllListeners', {
			value: this.removeAllListeners.bind(this),
		});

		Object.defineProperty(this.ListenerManager, 'removeAllListeners', {
			value: this.removeAllListeners.bind(this),
		});

		Object.defineProperty(this.AtomClient, 'removeAllListeners', {
			value: this.removeAllListeners.bind(this),
		});

		// @ts-expect-error _events is private
		this._events = this.CommandManager._events = this.ListenerManager._events = this.AtomClient._events = this.events;
	}

	removeAllListeners() {
		this.events = {};
		// @ts-expect-error _events is private
		this._events = this.CommandManager._events = this.ListenerManager._events = this.AtomClient._events = this.events;
		// @ts-expect-error _eventsCount is private
		this.eventsCount = 0;

		return this;
	}

	async exec(...args: IntersectedEvents[T]) {}
}
