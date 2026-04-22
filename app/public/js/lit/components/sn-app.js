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

  render() {
    return html`
      <div id="app" class="ui_app ${this.state.get('isSongPlaying') ? 'songPlaying' : ''}">
        <!-- Header slot - will contain sn-header -->
        <slot name="header"></slot>
        <!-- Sidebar slot - will contain sn-sidebar -->
        <slot name="sidebar"></slot>
        <!-- Player slot - will contain sn-player -->
        <slot name="player"></slot>
        <!-- Router outlet for views -->
        <div class="mainView" id="lit-router-outlet"></div>
        <!-- Queue slot -->
        <slot name="queue"></slot>
      </div>
    `;
  }
}

customElements.define('sn-app', SnApp);
