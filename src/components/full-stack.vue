<template>
<div>
<div class="container" style="overflow-y: auto;">
  <h2 class="title">Full Stack:</h2>
  <p class="text-primary">Expertise at every level of the web application build process</p>
  <img src="@/assets/full-stack.svg"/>
</div>
</div>
</template>

<style lang="scss" scoped>

@import './common';

@media #{$phablet} {
  img {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }
}

</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({

});
</script>

