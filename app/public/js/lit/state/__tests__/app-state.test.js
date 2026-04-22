import { describe, it, expect, vi } from 'vitest';
import { appState } from '../app-state.js';

describe('AppState', () => {
  it('get/set works', () => {
    expect(appState.get('isSongPlaying')).toBe(false);
    appState.set('isSongPlaying', true);
    expect(appState.get('isSongPlaying')).toBe(true);
    appState.set('isSongPlaying', false);
  });

  it('subscribe fires on change', () => {
    const spy = vi.fn();
    const unsub = appState.subscribe('shuffle', spy);
    appState.set('shuffle', true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);
    unsub();
    appState.set('shuffle', false);
  });

  it('unsubscribe stops notifications', () => {
    const spy = vi.fn();
    const unsub = appState.subscribe('repeat', spy);
    appState.set('repeat', true);
    unsub();
    appState.set('repeat', false);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('no-op when setting the same value', () => {
    const spy = vi.fn();
    appState.set('lock', false);
    const unsub = appState.subscribe('lock', spy);
    appState.set('lock', false);
    expect(spy).not.toHaveBeenCalled();
    unsub();
  });

  it('getSnapshot returns a copy of all state', () => {
    const snap = appState.getSnapshot();
    expect(snap).toHaveProperty('isSongPlaying');
    expect(snap).toHaveProperty('userId');
    snap.isSongPlaying = true;
    expect(appState.get('isSongPlaying')).toBe(false);
  });
});
