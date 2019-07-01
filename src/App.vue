<template>
  <div id="app">
    <router-view>
    </router-view>
    <contact-us id="contact-us"/>
    <mdc-snackbar />
  </div>
</template>

<style lang="scss">

@import "app";

#contact-us {
  pointer-events: none;
  right: 0;
  bottom: 0;
  position: fixed;
  padding-bottom: 40px;
  width: 40%;
  height: 40%;
}
@media #{$phablet} {
  #contact-us {
    width: 100%;
    height: 50%;
  }
}

</style>

<script lang="ts">

import Vue from 'vue';

import ContactUs from './components/contact-us';

export default Vue.extend({
  components: {
    'contact-us': ContactUs,
  },
});
</script>
