import * as lib from '../src/lib.js'
import EventEmitter from '../src/lib.js'

import * as events from 'events'
import NodeEventEmitter from 'events'
import assert from 'assert'

describe('basics', () => {
  it('exports nodejs events module', () => {
    assert.deepStrictEqual(NodeEventEmitter, EventEmitter)
    assert.strictEqual(events.EventEmitter, lib.EventEmitter)
    assert.strictEqual(events.listenerCount, lib.listenerCount)
    assert.strictEqual(events.on, lib.on)
    assert.strictEqual(events.once, lib.once)
  })
})
