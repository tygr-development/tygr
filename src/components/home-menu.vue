<template>
<div>

  <template v-for="page in pages">

    <router-link 
      :key="page.path"
      :to="page.path === 'home' ? '/home' : `/home/${page.path}`">
      
      <button class="menu-button" @click="$emit('close')">
        <div class="menu-item">
          
          <div 
            class="tile"
            :style="{ 
              backgroundColor: page.color,
              minWidth: curPath === page.path ? '30px' : '20px'
            }"/>
          
          <h2
            class="title-text"
            :style="{ fontWeight: curPath === page.path ? 'bold' : 'normal' }"
          >{{ page.name }}</h2>
        </div>
      </button>

    </router-link>

  </template>

</div>
</template>

<style lang="scss" scoped="true">

.tile {
  height: 70px;
  width: 20px;
  min-width: 20px;
}

.title-text {
  display: inline;
  text-align: left;
  margin-left: 10px;
}

.menu-item {
  width: 100%;
  display: flex;
}
.menu-button {
  height: 70px;
  width: 100%;
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
  cursor:pointer;
  overflow: hidden;
  outline:none;
}
h4 {
  margin: auto;
}

</style>

<script lang="ts">

import Vue from 'vue';

import * as RouterModule from '../modules/router';
import pages from './pages';

export default Vue.extend({
  data: () => ({
    pages,
  }),
  subscriptions() { return {
    curPath: this.$store.select$(RouterModule.getPath)
      .map((path) => path.split('/'))
      .map((tokens) => tokens[tokens.length - 1]),
  }; },
});
</script>
