
export declare class EventEmitter <Events extends Listeners = UnkownListeners> implements NodeJS.EventEmitter {
  Events: Events | undefined
  constructor(options?: EventEmitterOptions)
  static listenerCount <Events extends Listeners, Event extends keyof Events> (emitter:EventEmitter<Events>, event: Event):number
  static on <Events extends Listeners, Event extends keyof Events>(emitter:EventEmitter<Events>, event:Event, listener:Events[Event]): EventEmitter<Events>
  static once <Events extends Listeners, Event extends keyof Events>(emitter:EventEmitter<Events>, event:Event, listener:Events[Event]): EventEmitter<Events>
  
  static defaultMaxListeners: number;
  static readonly captureRejectionSymbol: unique symbol;
  /**
   * This symbol shall be used to install a listener for only monitoring `'error'`
   * events. Listeners installed using this symbol are called before the regular
   * `'error'` listeners are called.
   *
   * Installing a listener using this symbol does not change the behavior once an
   * `'error'` event is emitted, therefore the process will still crash if no
   * regular `'error'` listener is installed.
   */
  static readonly errorMonitor: unique symbol;
  /**
   * Sets or gets the default captureRejection value for all emitters.
   */
  static captureRejections: boolean;

  on <Event extends keyof Events>(event:Event, listener:Events[Event]): this
  once <Event extends keyof Events>(event:Event, listener:Events[Event]): this
  addListener <Event extends keyof Events>(event:Event, listener:Events[Event]): this
  prependListener <Event extends keyof Events>(event:Event, listener:Events[Event]): this
  prependOnceListener <Event extends keyof Events>(event:Event, listener:Events[Event]): this
  removeListener <Event extends keyof Events>(event:Event, listener:Events[Event]): this
  off <Event extends keyof Events>(event:Event, listener:Events[Event]): this
  removeAllListeners <Event extends keyof Events>(event?: Event): this
  listenerCount<Event extends keyof Events> (event: Event):number
  listeners <Event extends keyof Events> (event: Event): Array<Events[Event]>
  rawListeners <Event extends keyof Events> (event: Event): Array<Events[Event]>
  eventNames <Event extends keyof Events>():Array<Event>
  emit <Event extends keyof Events>(event:Event, ...params:Parameters<Events[Event]>): boolean
  setMaxListeners(n: number): this;
  getMaxListeners(): number;
}

export declare var on :(typeof EventEmitter)['on']
export declare var once :(typeof EventEmitter)['once']
export declare var listenerCount:(typeof EventEmitter)['listenerCount']


interface EventEmitterOptions {
  /**
   * Enables automatic capturing of promise rejection.
   */
  captureRejections?: boolean;
}

type Listeners = Record<string|symbol, (...args:any[]) => void>
type UnkownListeners = Record<string|symbol, (...args:unknown[]) => void>
