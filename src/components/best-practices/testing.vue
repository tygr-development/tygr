<template>
<div class="best-practices-page-container">
  <h3 class="title">Automated Testing</h3>

  <p class="text-primary">
    Test-driven development (TDD) is the best way to ensure reliable user experiences. Watch them in action in real time:
  </p>

  <div id="testing-button-container">
    <mdc-button
      @click="showE2ETests">
      E2E
    </mdc-button>

    <mdc-button
      @click="showUnitTests">
      Unit
    </mdc-button>
  </div>
</div>
</template>

<style lang="scss" scoped="true">

#testing-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 5%;
  margin-right: 5%;
}
.testing-title {
  font-size: 3vh;
}
.testing {
  font-size: 2vh;
}
#testing-button-container {
  display: flex;
  justify-content: space-around;
}

</style>

<script lang="ts">

import Vue from 'vue';
import * as MediaModule from '../../modules/media';

export default Vue.extend({
  methods: {
    showE2ETests() {
      this.$store.dispatch(new MediaModule.SetVid('E2E Testing', require('@/assets/e2e.mp4')));
    },
    showUnitTests() {
      this.$store.dispatch(new MediaModule.SetVid('Unit Testing', require('@/assets/unit.mp4')));
    },
  },
});
</script>