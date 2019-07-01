<template>
<div>
<div class="container">
  
  <h2 id="best-practices-title">Best Practices</h2>

  <mdc-tab-bar style="margin: 0 -5vw 0 -5vw">
    <mdc-tab @click="page = 'performance'">Performance</mdc-tab>
    <mdc-tab @click="page = 'testing'">Testing</mdc-tab>
    <mdc-tab @click="page = 'tooling'">Tooling</mdc-tab>
  </mdc-tab-bar>

  <performance style="flex-grow: 1" v-if="page === 'performance'"/>
  <testing style="flex-grow: 1" v-if="page === 'testing'"/>
  <tooling style="flex-grow: 1" v-if="page === 'tooling'"/>

</div>
</div>
</template>

<style lang="scss">

@import '../common';

#best-practices-title {
  margin: 20;
  text-align: center;
}
@media #{$phablet} {
  #best-practices-title {
    margin: 0;
  }
}

.best-practices-page-container {
  @extend .container;
  //width: calc(100% - 10vw);
  padding: 0;
  max-width: 100%;
}

</style>

<script lang="ts">

import Vue from 'vue';

import Performance from './performance';
import Testing from './testing';
import Tooling from './tooling';

import * as RouterModule from '../../modules/router';

export default Vue.extend({
  data: () => ({
    page: 'performance',
  }),
  components: {
    performance: Performance,
    testing: Testing,
    tooling: Tooling,
  },
});
</script>
