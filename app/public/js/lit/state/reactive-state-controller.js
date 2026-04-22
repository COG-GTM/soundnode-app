import { appState } from './app-state.js';

/**
 * Lit ReactiveController that subscribes a host element to AppState keys.
 *
 * Usage:
 *   class MyEl extends LitElement {
 *     stateCtrl = new ReactiveStateController(this, ['isSongPlaying', 'shuffle']);
 *     render() {
 *       return html`Playing: ${this.stateCtrl.get('isSongPlaying')}`;
 *     }
 *   }
 */
export class ReactiveStateController {
  #host;
  #keys;
  #unsubs = [];
  #values = {};

  constructor(host, keys) {
    this.#host = host;
    this.#keys = keys;
    host.addController(this);
  }

  hostConnected() {
    this.#keys.forEach(key => {
      this.#values[key] = appState.get(key);
      const unsub = appState.subscribe(key, (val) => {
        this.#values[key] = val;
        this.#host.requestUpdate();
      });
      this.#unsubs.push(unsub);
    });
  }

  hostDisconnected() {
    this.#unsubs.forEach(fn => fn());
    this.#unsubs = [];
  }

  get(key) {
    return this.#values[key];
  }
}
