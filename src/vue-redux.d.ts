import Vue from 'vue';
import { Route } from 'vue-router';
import { Store } from './store';

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    store?: Store;
  }
}
