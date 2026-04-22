import { Router } from '@vaadin/router';

// Route configuration matching the 13 states in app.js lines 25-90
// These will be activated once view components are migrated in Phase 4
export const routes = [
  { path: '/', component: 'sn-stream-view' },
  { path: '/charts/:genre', component: 'sn-charts-view' },
  { path: '/favorites', component: 'sn-favorites-view' },
  { path: '/tracks', component: 'sn-tracks-view' },
  { path: '/track/:id', component: 'sn-track-view' },
  { path: '/playlists', component: 'sn-playlists-view' },
  { path: '/search', component: 'sn-search-view' },
  { path: '/tag/:name', component: 'sn-tag-view' },
  { path: '/following', component: 'sn-following-view' },
  { path: '/followers', component: 'sn-followers-view' },
  { path: '/profile/:id', component: 'sn-profile-view' },
  { path: '/settings', component: 'sn-settings-view' },
  { path: '/news', component: 'sn-news-view' },
];

let routerInstance = null;

export function initRouter(outlet) {
  routerInstance = new Router(outlet);
  routerInstance.setRoutes(routes);
  return routerInstance;
}

export function getRouter() {
  return routerInstance;
}
