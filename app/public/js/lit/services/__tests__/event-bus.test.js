import { describe, it, expect, vi } from 'vitest';
import { eventBus } from '../event-bus.js';

describe('EventBus', () => {
  it('emit + on works and passes detail', () => {
    const spy = vi.fn();
    eventBus.on('test::emit-on', spy);
    eventBus.emit('test::emit-on', { foo: 'bar' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ foo: 'bar' });
  });

  it('once only fires a single time', () => {
    const spy = vi.fn();
    eventBus.once('test::once', spy);
    eventBus.emit('test::once', 1);
    eventBus.emit('test::once', 2);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('unsubscribe function returned by on works', () => {
    const spy = vi.fn();
    const unsub = eventBus.on('test::unsub', spy);
    eventBus.emit('test::unsub', 'a');
    unsub();
    eventBus.emit('test::unsub', 'b');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('a');
  });

  it('passes null detail when emit is called without payload', () => {
    const spy = vi.fn();
    eventBus.on('test::no-detail', spy);
    eventBus.emit('test::no-detail');
    expect(spy).toHaveBeenCalledWith(null);
  });
});
