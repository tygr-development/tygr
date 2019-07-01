<template>
<div>
<div class="container">
  <h2 class="title">Single Page Application</h2>

  <p class="text-primary">
    The entire website is contained within a single HTML file. Each link will load instantly rather than requiring a new page to be downloaded.</mdc-body>
  <p class="text-primary">
    Try clicking each link in the menu ( <mdc-icon class="menu-icon" icon="menu"/> on mobile ) to see the page update immediately.
  </p>
</div>
</div>
</template>

<style lang="scss">
  
  @import './common';

  .menu-icon {
    vertical-align: bottom;
    background-color: $primary;
    color: white;
    font-size: 1vh;
  }

</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({

});
</script>

