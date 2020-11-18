# typed-events.ts

Library (re)exports [node events][] API along with typescript [type declarations][] to enable optional typing of events / listeners which improves:

1. Intelisence in code editors (completion on of `on`, `emit`).
2. Enables type checker to identify problems with mispelled types names, incorrect listeners & emit calls.

> Note: Inculeded typescript type declarations are stricter than built-in ones that come with typescript. See examples for details.

## Usage

### In Typescript

```ts
import { EventEmitter } from "typed-events.ts"

class Swarm extends EventEmitter<SwarmEvents> {
  constructor(peers: WebSocket[] = []) {
    this.peers = peers
  }
  // ...
}

type SwarmEvents = {
  connect(peer:WebSocket):void
  disconnect(peer:WebSocket):void
  message(peer:WebSocket, data:Uint8Array): void
}

const swarm = new Swarm()
swarm.on("connect", (peer) => {
  // TS infers that peer is WebSocket here
  peer.send("hello")
})

// Does not type check no "close" event
swarm.on("close", (peer) => {})
```

### In JS [via JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)


```js
import { EventEmitter } from "typed-events.ts"

/**
 * @extends {EventEmitter<SwarmEvents>} 
 */
class Swarm extends EventEmitter {
  /**
   * @param {WebSocket[]} [peers]
   */
  constructor(peers = []) {
    this.peers = peers
  }
  // ...
}
/**
 * @typedef {Object} SwarmEvents
 * @property {(peer:WebSocket) => void} connect
 * @property {(peer:WebSocket) => void} disconnect
 * @property {(peer:WebSocket, message:Uint8Array)} message
 */

const swarm = new Swarm()
swarm.on("connect", (peer) => {
  // TS infers that peer is WebSocket here
  peer.send("hello")
})

// Does not type check no "close" event
swarm.on("close", (peer) => {})
```

Also works provides commonjs exports so you can replace import with require instead.


[node events]:https://nodejs.org/api/events.html
[type declarations]:https://www.typescriptlang.org/docs/handbook/2/type-declarations.html
