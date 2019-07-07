import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from './components/home';
import HomeMain from './components/home-main';

import Configurator from './components/Configurator';
import IndustrialAutomation from './components/IndustrialAutomation';
import WorkSample from './components/WorkSample';
import ContinuousImprovement from './components/ContinuousImprovement';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/home' },
    {
      children: [
        { path: '', component: HomeMain },
        { path: 'configurator', component: Configurator },
        { path: 'industrial-automation', component: IndustrialAutomation },
        { path: 'work-sample', component: WorkSample },
        { path: 'continuous-improvement', component: ContinuousImprovement },
      ],
      component: Home,
      path: '/home',
    },
  ],
});
