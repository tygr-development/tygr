import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from './components/home';

import BestPractices from './components/best-practices';
import CrossPlatform from './components/cross-platform';
import FullStack from './components/full-stack';
import HomeMain from './components/home-main';
import PWA from './components/pwa';
import SPA from './components/spa';
import Testimonials from './components/testimonials';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/home' },
    {
      children: [
        { path: '', component: HomeMain },
        { path: 'cross-platform', component: CrossPlatform },
        { path: 'single-page-application', component: SPA },
        { path: 'progressive-web-app', component: PWA },
        { path: 'full-stack', component: FullStack },
        { path: 'best-practices', component: BestPractices },
        { path: 'testimonials', component: Testimonials},
      ],
      component: Home,
      path: '/home',
    },
  ],
});
