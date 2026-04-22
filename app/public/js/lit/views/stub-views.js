import { LitElement, html } from 'lit';

// Stub views - will be replaced with real implementations in Phase 4
const viewNames = [
  'sn-stream-view', 'sn-charts-view', 'sn-favorites-view',
  'sn-tracks-view', 'sn-track-view', 'sn-playlists-view',
  'sn-search-view', 'sn-tag-view', 'sn-following-view',
  'sn-followers-view', 'sn-profile-view', 'sn-settings-view',
  'sn-news-view'
];

viewNames.forEach(name => {
  if (!customElements.get(name)) {
    customElements.define(name, class extends LitElement {
      render() { return html`<p>Placeholder: ${name}</p>`; }
    });
  }
});
