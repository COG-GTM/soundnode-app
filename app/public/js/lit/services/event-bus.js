/**
 * EventBus replaces $rootScope.$broadcast / $rootScope.$on
 * for cross-component communication.
 *
 * Known events (from current Angular codebase):
 * - 'track::favorited' (detail: trackId) — from favoriteSongDirective.js, playerService.js
 * - 'track::unfavorited' (detail: trackId) — from favoriteSongDirective.js, playerService.js
 * - 'activateQueue' (no detail) — from playerService.js
 * - 'player:playPause' — from playerCtrl.js
 * - 'queue:activate' — from queueCtrl.js
 * - '$stateChangeSuccess' — from app.js (route changes)
 */
class EventBus extends EventTarget {
  emit(name, detail = null) {
    this.dispatchEvent(new CustomEvent(name, { detail }));
  }

  on(name, callback) {
    const handler = (e) => callback(e.detail);
    this.addEventListener(name, handler);
    // Return unsubscribe function
    return () => this.removeEventListener(name, handler);
  }

  once(name, callback) {
    const handler = (e) => callback(e.detail);
    this.addEventListener(name, handler, { once: true });
    // Return unsubscribe function (mirrors `on`); lets callers cancel a pending
    // listener before it fires.
    return () => this.removeEventListener(name, handler);
  }
}

export const eventBus = new EventBus();
