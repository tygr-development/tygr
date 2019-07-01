import Vue from 'vue';

Vue.config.productionTip = false;

import createApp from './create-app';

import './sw-loader';

createApp().$mount('#app');

