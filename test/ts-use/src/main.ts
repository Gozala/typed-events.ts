import { EventEmitter, listenerCount, on, once } from 'events-ts'


const $secret: unique symbol = Symbol.for('secret')

type ConnectionListeners = {
  connect(connection:Connection):void,
  ['peer:message'](connection:Connection, message:Uint8Array):void
  [$secret](secret:Uint8Array): void
  disconnect(connection:Connection):void
}

class Connection {
  id: string
  constructor(id: string) {
    this.id = id
  }
  send(_message:Uint8Array) {

  }
}
class ConnectionManager extends EventEmitter<ConnectionListeners> {

}

class Unknown extends EventEmitter {

}

export const main = () => {
  const manager = new ConnectionManager()

  manager.on("connect", (connection) => {
    const id:string = connection.id
    console.log(id)
    // @ts-expect-error - Recognizes the Connection type
    const peer:WebSocket = connection
    void peer
  })
  // Less arguments is listener is ok
  manager.on("connect", () => {})

  // @ts-expect-error - bla event is not known
  manager.on('bla', () => {})

  // Symbol even name is fine
  manager.addListener($secret, (bytes: Uint8Array) => {
    new TextDecoder().decode(bytes)
  })

  // @ts-expect-error - Expects Uint8Array
  manager.addListener($secret, (_data: Uint32Array) => {})

  // Once works as well
  manager.once("disconnect", (_connection:Connection) => {})
  // @ts-expect-error typo in event name
  manager.once("disconect", () => {})

  manager.prependListener("peer:message", (connection, message) => {
    let c:Connection = connection
    // @ts-expect-error - Connection is not a WebSocket
    let w:WebSocket = connection

    let m:Uint8Array = message
    // @ts-expect-error - Uint8Aray is not a Buffer
    let b:Buffer = message

    console.log(c, w, m, b)
  })
  
  // @ts-expect-error - listener should have two params not three
  manager.prependListener("peer:message", (_connection, _message, _none) => {

  })

  manager.prependListener("peer:message", (...args) => {
    const [connection, message] = args
    // infers types
    connection.send(message)

    // @ts-expect-error - not a Connection
    let w:WebSocket = connection
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
    // @ts-expect-error
    const w:WebSocket = connection
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
    // @ts-expect-error - unknown type does not have toString
    data.toString()
  })
}
