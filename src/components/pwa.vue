<template>
<div>
<div class="container">
  <h2 class="title">Progressive Web App</h2>

  <p class="text-primary" style="margin-bottom: 20px;">
    Progressive web apps (PWAs) try to make a website act like a native app.
  </p>

  <div style="overflow-y: auto;" @wheel.stop @touchmove.stop>

  <div>
    <p class="text-primary">
      PWAs can be installed to a user's home screen on android or desktop.
    </p>

    <p class="description">
      If on android or using Chrome or Firefox on a desktop, you should see an option to install this website when you first visit it.
    </p>
  </div>

  <div>
    <p class="text-primary">
      PWAs can send notifications to the user, even when the website is closed
    </p>

    <p class="description">
      If you start a chat with the developer and accept notifications, you will be notified with every new message
    </p>
  </div>

  <div>
    <p class="text-primary">
      PWAs can work offline
    </p>

    <p class="description">
      Try turning the wifi off and refreshing the page, it should still work.
    </p>
  </div>

  </div>

</div>
</div>
</template>

<style lang="scss">

@import './common';

.description {
  @extend .text-secondary;
  color: $p-dark;
  margin: 15px;
}

</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({

});
</script>

