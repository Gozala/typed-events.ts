// @ts-check

const { EventEmitter, listenerCount, on, once } =  require('events-ts')


const $secret = Symbol.for('secret')

/**
 * @typedef {{
 *   connect(connection:Connection):void,
 *   ['peer:message'](connection:Connection, message:Uint8Array):void
 *   [$secret](secret:Uint8Array): void
 *   disconnect(connection:Connection):void
 * }} ConnectionListeners
 */

class Connection {
  /**
   * @param {string} id
   */
  constructor(id) {
    this.id = id
  }
  /**
   * @param {Uint8Array} bytes
   */
  send(bytes) {
    void bytes
  }
}

/**
 * @extends {EventEmitter<ConnectionListeners>}
 */
class ConnectionManager extends EventEmitter {
}

class Unknown extends EventEmitter {
}

export const main = () => {
  const manager = new ConnectionManager()

  manager.on("connect", (connection) => {
    /** @type {string} */
    const id = connection.id
    console.log(id)
    
    /** @type {WebSocket} */
    // @ts-expect-error - Recognizes the Connection type
    const peer = connection
    void peer
  })
  // Less arguments is listener is ok
  manager.on("connect", () => {})

  // @ts-expect-error - bla event is not known
  manager.on('bla', () => {})

  // Symbol even name is fine
  manager.addListener($secret, (bytes) => {
    new TextDecoder().decode(bytes)
  })


  // @ts-expect-error - Uint8Array isn't Uint16Array
  manager.addListener($secret,  (/**@type {Uint16Array} */_data) => {})

  // Once works as well
  manager.once("disconnect", (/** @type {Connection} */_connection) => {})
  // @ts-expect-error typo in event name
  manager.once("disconect", () => {})

  manager.prependListener("peer:message", (connection, message) => {
    /** @type {Connection} */
    let c = connection

    /** @type {WebSocket} */
    // @ts-expect-error - Connection is not a WebSocket
    let w = connection

    /** @type {Uint8Array} */
    let m = message

    /** @type {Buffer} */
    // @ts-expect-error - Uint8Aray is not a Buffer
    let b = message

    console.log(c, w, m, b)
  })
  
  
  manager.prependListener("peer:message", 
  /**
   * @param {Connection} connection
   * @param {Uint8Array} message
   * @param {any} none
   */
  // @ts-expect-error - expects three params
  (connection, message, none) => {
    console.log(connection, message, none)
  })

  manager.prependListener("peer:message", (...args) => {
    const [connection, message] = args
    // infers types
    connection.send(message)

    /** @type {WebSocket} */
    // @ts-expect-error - not a Connection
    let w = connection
    void w
  })

  for (const listener of manager.listeners("connect")) {
    listener(new Connection("test"))
    // @ts-expect-error - expects Connection
    listener()
    // @ts-expect-error - expects Connection instance
    listener(new WebSocket())
  }

  // @ts-expect-error - no connected event
  manager.listenerCount("connected")
  // Symbols are fine
  manager.listenerCount($secret)

  // @ts-expect-error - expects arg
  manager.emit("connect")
  // Expects connection param
  manager.emit("connect", new Connection("test"))
  // @ts-expect-error - doesn't expect 3rd arg
  manager.emit("connect", new Connection("test"), 2)
  // @ts-expect-error - typeo in event name
  manager.emit("disconect", new Connection("out"))
  // Expects connection and message params
  manager.emit("peer:message", new Connection("peer"), new Uint8Array())
  // @ts-expect-error - expects args
  manager.emit("peer:message")
  // @ts-expect-error - expects 2 args
  manager.emit("peer:message", new Connection("peer"))
  // @ts-expect-error - expects 2 args
  manager.emit("peer:message", new Connection("peer"), new Uint8Array(), new Uint8Array())


  // Static methods
  on(manager, "connect", (connection) => {
    /** @type {WebSocket} */
    // @ts-expect-error
    const w = connection
    void w

    connection.send(new Uint8Array())
  })

  once(manager, "peer:message", (_connection, _message) => {

  })

  listenerCount(manager, "connect") + 1
  // @ts-expect-error - foo event isn't known
  listenerCount(manager, "foo")

  // @ts-expect-error - foo event isn't known
  EventEmitter.listenerCount(manager, "foo")

  const un = new Unknown()

  un.on("hello", (data) => {
    // @ts-expect-error - unknown type does not have slice
    data.slice()
  })
}
