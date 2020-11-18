const lib = require('..')
const events = require('events')
const assert = require("assert")

describe('basics', () => {
  it('exports nodejs events module', () => {
    assert.strictEqual(events.EventEmitter, lib.EventEmitter)
    assert.strictEqual(events.listenerCount, lib.listenerCount)
    assert.strictEqual(events.on, lib.on)
    assert.strictEqual(events.once, lib.once)
  })
})
