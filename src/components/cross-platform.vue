<template>
<div>
<div class="container">
  
  <h2 class="title">Cross Platform</h2>

  <p class="text-primary">
    One website works on multiple devices. Same address, different look. Check it out:
  </p>

  <div class="button-container">
    <mdc-button @click="showMobile">Mobile</mdc-button>
    <mdc-button @click="showDesktop">Desktop</mdc-button>
  </div>
</div>
</div>
</template>

<style lang="scss" scoped="true">

@import './common';

.button-container {
  font-size: 3vh;
  grid-area: 6 / 1 / 7 / 4;
  display: flex;
  justify-content: space-around;
}

</style>

<script lang="ts">

import Vue from 'vue';

import * as MediaModule from '../modules/media';

export default Vue.extend({
  methods: {
    showMobile() {
      this.$store.dispatch(new MediaModule.SetImg('Mobile', require('@/assets/mobile-tygr.png')));
    },
    showDesktop() {
      this.$store.dispatch(new MediaModule.SetImg('Desktop', require('@/assets/desktop-tygr.png')));
    },
  },
});
</script>
