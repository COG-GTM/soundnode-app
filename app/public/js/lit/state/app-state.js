import { eventBus } from '../services/event-bus.js';

/**
 * AppState is a reactive singleton that replaces $rootScope properties.
 * Components subscribe to 'state-changed' events on the eventBus.
 *
 * Usage in LitElement:
 *   connectedCallback() {
 *     super.connectedCallback();
 *     this._unsub = appState.subscribe('isSongPlaying', (val) => {
 *       this.isSongPlaying = val;
 *     });
 *   }
 *   disconnectedCallback() {
 *     this._unsub();
 *     super.disconnectedCallback();
 *   }
 */
class AppState {
  #state = {
    isSongPlaying: false,
    isPlaylistPlaying: false,
    shuffle: false,
    repeat: false,
    lock: false,
    oldView: '',
    currentView: '',
    userId: null,
  };

  #listeners = new Map();

  get(key) {
    return this.#state[key];
  }

  set(key, value) {
    if (this.#state[key] === value) return;
    this.#state[key] = value;
    eventBus.emit('state-changed', { key, value });
    // Notify key-specific listeners
    const keyListeners = this.#listeners.get(key);
    if (keyListeners) {
      keyListeners.forEach(cb => cb(value));
    }
  }

  subscribe(key, callback) {
    if (!this.#listeners.has(key)) {
      this.#listeners.set(key, new Set());
    }
    this.#listeners.get(key).add(callback);
    // Return unsubscribe function
    return () => this.#listeners.get(key)?.delete(callback);
  }

  // Convenience: get a snapshot of all state
  getSnapshot() {
    return { ...this.#state };
  }
}

export const appState = new AppState();

// Also expose on window for Angular interop during migration
if (typeof window !== 'undefined') {
  window.__sn_appState = appState;
}
