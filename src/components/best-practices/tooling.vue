<template>
<div class="best-practices-page-container">

  <p class="testing-title">
    Cutting edge libraries to aid in development
  </p>

  <div class="table-container" @wheel.stop @touchmove.stop>
    <table class="tooling-table">
      <col width="30%">
      <col width="70%">
      <tr>
        <td>Languages</td>
        <td>
          <div style="text-align: center;">
            <a href="http://www.typescriptlang.org/" target="_blank">Typescript</a>,
            <a href="https://sass-lang.com/" target="_blank">SCSS</a>,
            <a href="https://www.w3.org/TR/html52/" target="_blank">HTML 5</a>
          </div>
        </td>
      </tr>
      <tr>
        <td>Front End</td>
        <td>
          <div style="text-align: center;">
            <a href="https://vuejs.org/" target="_blank">VueJS</a>,
            <a href="https://material.io/components/web/" target="_blank">Material Design Components</a>,
            <a href="https://greensock.com/" target="_blank">GSAP</a>
          </div>
        </td>
      </tr>
      <tr>
        <td>Continuous Integration</td>
        <td>
          <div style="text-align: center;">
            <a href="https://git-scm.com/" target="_blank">Git</a>,
            <a href="https://gulpjs.com/" target="_blank">Gulp</a>,
            <a href="https://webpack.js.org/" target="_blank">Webpack</a>,
            <a href="https://browsersync.io/" target="_blank">BrowserSync</a>
          </div>
        </td>
      </tr>
      <tr>
        <td>State Managament</td>
        <td>
          <div style="text-align: center;">
            <a href="https://redux.js.org/" target="_blank">Redux</a>,
            <a href="https://redux-saga.js.org/" target="_blank">Redux-Saga</a>,
            <a href="http://reactivex.io/rxjs/" target="_blank">RxJS</a>
          </div>
        </td>
      </tr>
      <tr>
        <td>Testing</td>
        <td>
          <div style="text-align: center;">
            <a href="https://www.cypress.io/" target="_blank">Cypress</a>,
            <a href="https://mochajs.org/" target="_blank">Mochai</a>,
            <a href="http://www.chaijs.com/" target="_blank">Chai</a>,
            <a href="http://sinonjs.org/" target="_blank">Sinon</a>
          </div>
        </td>
      </tr>
      <tr>
        <td>Back End</td>
        <td>
          <div style="text-align: center;">
            <a href="https://expressjs.com/" target="_blank">Express</a>,
            <a href="http://www.passportjs.org/" target="_blank">Passport</a>,
            <a href="https://www.mongodb.com/" target="_blank">MongoDB</a>,
            <a href="http://mongoosejs.com/" target="_blank">Mongoose</a>,
            <a href="https://github.com/websockets/ws" target="_blank">WebSocket</a>
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>
</template>

<style lang="scss">

@import '../common';

.testing-title {
  @extend .text-primary;
  margin: 25px 0 25px 0;
}
@media #{$phablet} {
  .testing-title {
    margin: 10px 0 10px 0;
  }
}
.table-container {
  flex-grow: 1;
  align-self: stretch;
  overflow-y: auto
}
.tooling-table {
  @extend .text-primary;
  border: solid;
  height: 48vh;
  width: 100%;
  border-spacing: 0px;
  tr {
    height: 8vh;
  }
  tr:nth-child(even){
    background-color: #CCC;
  }
  td {
    padding: 0px 15px 0px 15px;
  }
}

</style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({

});
</script>

