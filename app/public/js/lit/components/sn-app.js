import { LitElement, html } from 'lit';
import { ReactiveStateController } from '../state/reactive-state-controller.js';

/**
 * Top-level app shell. During migration this is NOT yet mounted —
 * Angular's AppCtrl still controls the page. This component is
 * ready for Phase 4 when the Angular shell is replaced.
 */
export class SnApp extends LitElement {
  state = new ReactiveStateController(this, ['isSongPlaying']);

  // Disable shadow DOM during migration so global styles still apply
  createRenderRoot() {
    return this;
  }

  // Light DOM containers (named regions) instead of <slot> elements, since
  // <slot> only projects content inside a shadow root and we render into the
  // host (createRenderRoot returns this) so existing global CSS keeps working.
  // Phase 4 components mount into these regions by id.
  render() {
    return html`
      <div id="app" class="ui_app ${this.state.get('isSongPlaying') ? 'songPlaying' : ''}">
        <div id="sn-header-region"></div>
        <div id="sn-sidebar-region"></div>
        <div id="sn-player-region"></div>
        <div class="mainView" id="lit-router-outlet"></div>
        <div id="sn-queue-region"></div>
      </div>
    `;
  }
}

customElements.define('sn-app', SnApp);
