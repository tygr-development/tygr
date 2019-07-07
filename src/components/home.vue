<template>
<mdc-layout-app>

  <mdc-toolbar slot="toolbar" fixed v-if="mobile">
    <mdc-toolbar-row>
      <mdc-toolbar-section align-start >
        <mdc-toolbar-menu-icon event="toggle-drawer"></mdc-toolbar-menu-icon>
      </mdc-toolbar-section>
    </mdc-toolbar-row>
  </mdc-toolbar>

  <mdc-drawer ref="drawer" slot="drawer" toggle-on="toggle-drawer" v-if="mobile">
    <home-menu @close="$refs['drawer'].close()"/>
  </mdc-drawer>
  
  <main>

    <mdc-card id="desktop-menu" v-if="!mobile">
      <home-menu/>
    </mdc-card>

    <div 
      id="home-container"
      @wheel="wheel"
      @touchmove="touchmove">

      <router-link
        style="grid-area: logo; justify-self: center;"
        to="/home">
        <img
          ref="logo"
          id="logo"
          src="@/assets/tygr.svg"
          alt="TyGr Development"/>
      </router-link>

      <div
        class="nav-container"
        style="grid-area: pre;">

        <div
          ref="top-block"
          class="nav-block"
          :style="{ backgroundColor: prePage ? prePage.color : 'transparent' }"/>

        <div
          ref="pre-block"
          class="nav-block"
          style="background-color: transparent;"/>

        <mdc-button
          v-if="prePage"
          class="nav-button"
          @click="gotoPrePage"
          data-cy="pre-page-btn">
          <mdc-icon style="color: white;" icon="expand_less"/>
        </mdc-button>

      </div>

     
      <div
        ref="middle-block"
        style="grid-area: cur-page; transform-origin: top left"
        :style="{ backgroundColor: curPage ? curPage.color: 'transparent' }"/>

      <div 
        ref="router"
        class="home-router-container">
        <router-view id="home-router"></router-view>
      </div>

      <div
        class="nav-container"
        style="grid-area: next;">

        <div
          ref="bottom-block"
          class="nav-block"
          :style="{ backgroundColor: nextPage ? nextPage.color : 'transparent' }"/>

        <div
          ref="next-block"
          class="nav-block"
          style="background-color: transparent; transform-origin: bottom left"/>

        <mdc-button
          v-if="nextPage"
          class="nav-button"
          @click="gotoNextPage"
          data-cy="next-page-btn">
          <mdc-icon style="color: white;" icon="expand_more"/>
        </mdc-button>

      </div>
    </div>

  </main>

  <mdc-dialog 
    ref="media-dialog"
    :title="mediaTitle"
    id="media-dialog"
    accept="close"
    cancel=""
    @cancel="unsetMedia"
    @accept="unsetMedia">
      
      <img v-if="mediaImg" :src="mediaImg" style="max-height: 60%; max-width: 60%; width: auto; height: auto; display: block; margin: auto;"/>

      <video width="100%" v-if="mediaVid" :src="mediaVid" style="display: block margin: auto;" autoplay controls/>

  </mdc-dialog>

</mdc-layout-app>
</template>

<style lang="scss" scoped="true">

#home-container {
  height: 100vh;
  margin-left: 23%;
  margin-right: 23%;
  display: grid;
  grid-template:
    auto 36px 1fr 60px 36px
    / 10px 1fr;
  grid-row-gap: 5px;
  grid-template-areas:
    "logo       logo"
    "pre         pre"
    "cur-page router"
    "cur-page router"
    "next       next"
}
@media #{$phablet} {
  #home-container {
    position: fixed;
    margin: 0px;
    width: 100%;
    height: calc(100% - 56px);
  }
}
#desktop-menu {
  position: absolute;
  top: 30%;
  left: 5%;
  width: 15%;
  padding: 5px;
}
#logo {
  width: 935px;
  height: 384px;
}
@media #{$phablet} {
  #logo {
    width: 96px;
    height: 96px;
  }
}
.nav-container {
  position: relative;
}
.nav-block {
  display: block;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  transform-origin: top left;
}
.nav-button {
  display: table;
  margin: 0 auto;
}
.home-router-container {
  grid-area: router;
  display: flex;
  align-items: stretch;
  overflow-y: hidden;
}
@media #{$phablet} {
  .home-router-container {
    grid-area: 3 / 2 / 4 / 3;
  }
}
#home-router {
  width: 100%;
  align-items: stretch;
  justify-items: stretch;
}

</style>

<script lang="ts">

import Vue from 'vue';

import * as DeviceModule from '../modules/device';
import * as RouterModule from '../modules/router';
import * as MediaModule from '../modules/media';

import { TweenLite, TimelineLite } from 'gsap';

import HomeMenu from './home-menu';

import pageColors from './page-colors';
import pages from './pages';

declare module 'vue/types/vue' {
  interface Vue {
    curPageIndex: number;
    mobile: boolean;
    screenSize: { width: number, height: number };
    updateAnimations: () => {};
  }
}

export default Vue.extend({
  data: () => {
    return {
      timeline: null,
      nextPageTimeline: null,
      prePageTimeline: null,
      scrollAmount: 0,
      scrollTimeoutId: null,
      touchStart: 0,
      touchStarted: false,
      mounted: false,
    };
  },
  subscriptions() { return {
    mobile: this.$store.select$(DeviceModule.smallerOrEqTo('phablet')),
    curPageIndex: this.$store.select$(RouterModule.getPath)
      .do(() => this.updateAnimations())
      .map((path) => path.split('/'))
      .map((tokens) => {
        if (tokens.length === 2) {
          // home page
          return 0;
        }
        return pages.findIndex((page) => page.path === tokens[2]);
      }),
    mediaTitle: this.$store.select$(MediaModule.getTitle),
    mediaImg: this.$store.select$(MediaModule.getImgUrl)
      .do((url) => {
        if (url && this.$refs['media-dialog']) {
          (this.$refs['media-dialog'] as any).show();
        }
      }),
    mediaVid: this.$store.select$(MediaModule.getVidUrl)
      .do((url) => {
        if (url && this.$refs['media-dialog']) {
          (this.$refs['media-dialog'] as any).show();
        }
      }),
    screenSize: this.$store.select$(DeviceModule.getScreenSize)
      .do((size) => this.updateAnimations() ),
  }; },
  computed: {
    curPage() {
      return pages[this.curPageIndex];
    },
    prePage() {
      if (this.curPageIndex > 0) {
        return pages[this.curPageIndex - 1];
      } else {
        return null;
      }
    },
    nextPage() {
      if (this.curPageIndex < pages.length ) {
        return pages[this.curPageIndex + 1];
      } else {
        return null;
      }
    },
  },
  beforeMount() {
    this.$store.injectReducer(MediaModule.reducer);
  },
  mounted() {
    this.mounted = true;
    this.updateAnimations();
  },
  components: {
    'home-menu': HomeMenu,
  },
  methods: {
    unsetMedia() {
      this.$store.dispatch(new MediaModule.Unset());
    },
    async updateAnimations() {
      if (this.mounted) {
        await this.updateLogo();

        this.scrollAmount = 0;
        this.scrollTimeoutId = null;
        this.touchStarted = false;

        if (this.curPageIndex < pages.length - 1) {
          this.setNextPageTimeline();
        } else {
          this.nextPageTimeline = null;
        }
        if (this.curPageIndex > 0) {
          this.setPrePageTimeline();
        } else {
          this.prePageTimeline = null;
        }
      }
    },
    async updateLogo() {
      return new Promise((resolve) => {
        const logo = this.$refs.logo;
        if (this.$router.currentRoute.path.split('/').length > 2) {
          TweenLite.to(
            logo,
            .3,
            this.screenSize.height <= 560
              // Hide logo if screen height is too small
              ? { width: '0px', height: '0px' }
              : this.mobile
                ? { width: '234px', height: '96px' }
                : { width: '468px', height: '192px' },
          ).eventCallback('onComplete', resolve);
        } else {
          TweenLite.to(
            logo,
            .3,
            this.mobile
              ? { width: '351px', height: '144px' }
              : { width: '935px', height: '384px'},
          ).eventCallback('onComplete', resolve);
        }
      });
    },
    setNextPageTimeline() {

      const router = this.$refs.router;
      const topBlock: any = this.$refs['top-block'];
      const middleBlock: any = this.$refs['middle-block'];
      const bottomBlock: any = this.$refs['bottom-block'];
      const nextBlock: any = this.$refs['next-block'];

      const separator = 5;
      const outerBlockHeight = topBlock.clientHeight;
      const outerBlockWidth = topBlock.clientWidth;
      const middleBlockHeight = middleBlock.clientHeight;
      const middleBlockWidth = middleBlock.clientWidth;

      const bottomTransformY = -1 * ( separator + middleBlockHeight );
      const middleTransformY = -1 * ( separator + outerBlockHeight );
      const scaleY = middleBlockHeight / outerBlockHeight;
      const scaleX = middleBlockWidth / outerBlockWidth;

      this.nextPageTimeline = new TimelineLite();
      this.nextPageTimeline
        .add(TweenLite.to(router, .2, { opacity: 0 }))
        .add(() => {
          if (pages.length > this.curPageIndex + 2) {
            TweenLite.set(nextBlock, { css: { 'background-color': pages[this.curPageIndex + 2].color}});
          }
          TweenLite.set(bottomBlock, { css: { 'transform-origin': 'top left' }});
        })
        .add([
          TweenLite.to(bottomBlock, .3, {y: bottomTransformY, scaleY }),
          TweenLite.to(middleBlock, .3, { y: middleTransformY, scaleY: 1 / scaleY }),
          TweenLite.to(topBlock, .3, { scaleY: 0 }),
          TweenLite.fromTo(nextBlock, .3, { scaleY: 0 }, { scaleY: 1 }),
        ])
        .add([
          TweenLite.to(bottomBlock, .3, { scaleX }),
          TweenLite.to(middleBlock, .3, { scaleX: 1 / scaleX }),
        ])
        .add(() => {
          TweenLite.set(bottomBlock, { y: 0, scaleX: 1, scaleY: 1 });
          TweenLite.set(bottomBlock, {
            css: {
              'background-color':
                this.curPageIndex < pages.length - 2
                  ? pages[this.curPageIndex + 2].color
                  : 'transparent',
            },
          });

          TweenLite.set(middleBlock, { y: 0, scaleX: 1, scaleY: 1 });
          TweenLite.set(middleBlock, { css: { 'background-color': this.nextPage.color }});

          TweenLite.set(topBlock, { y: 0, scaleX: 1, scaleY: 1 });
          TweenLite.set(topBlock, { css: { 'background-color': this.curPage.color }});

          TweenLite.set(nextBlock, { css: { 'background-color': 'transparent' }});

          this.$router.push('/home/' + this.nextPage.path);
        })
        .add(TweenLite.to(router, .2, { opacity: 1 })).pause();

    },
    setPrePageTimeline() {

      const router = this.$refs.router;
      const topBlock: any = this.$refs['top-block'];
      const middleBlock: any = this.$refs['middle-block'];
      const bottomBlock: any = this.$refs['bottom-block'];
      const preBlock: any = this.$refs['pre-block'];

      const separator = 5;
      const outerBlockHeight = topBlock.clientHeight;
      const outerBlockWidth = topBlock.clientWidth;
      const middleBlockHeight = middleBlock.clientHeight;
      const middleBlockWidth = middleBlock.clientWidth;

      const topTransformY = outerBlockHeight + separator;
      const middleTransformY = separator + middleBlockHeight;
      const scaleY = middleBlockHeight / outerBlockHeight;
      const scaleX = middleBlockWidth / outerBlockWidth;

      this.prePageTimeline = new TimelineLite();
      this.prePageTimeline
        .add(TweenLite.to(router, .2, { opacity: 0 }))
        .add(() => {
          if (this.curPageIndex >= 2) {
            TweenLite.set(preBlock, { css: { 'background-color': pages[this.curPageIndex - 2].color}});
          }
          TweenLite.set(bottomBlock, { css: { 'transform-origin': 'bottom left' }});
        })
        .add([
          TweenLite.to(topBlock, .3, {y: topTransformY, scaleY }),
          TweenLite.to(middleBlock, .3, { y: middleTransformY, scaleY: 1 / scaleY }),
          TweenLite.to(bottomBlock, .3, { scaleY: 0 }),
          TweenLite.fromTo(preBlock, .3, { scaleY: 0 }, { scaleY: 1 }),
        ])
        .add([
          TweenLite.to(topBlock, .3, { scaleX }),
          TweenLite.to(middleBlock, .3, { scaleX: 1 / scaleX }),
        ])
        .add(() => {
          TweenLite.set(bottomBlock, { y: 0, scaleX: 1, scaleY: 1 });
          TweenLite.set(bottomBlock, { css: { 'background-color': this.curPage.color }});

          TweenLite.set(middleBlock, { y: 0, scaleX: 1, scaleY: 1 });
          TweenLite.set(middleBlock, { css: { 'background-color': this.prePage.color }});

          TweenLite.set(topBlock, { y: 0, scaleX: 1, scaleY: 1 });
          TweenLite.set(topBlock, {
            css: { 'background-color' : this.curPageIndex > 1 ? pages[this.curPageIndex - 2].color : 'transparent' },
          });

          TweenLite.set(preBlock, { css: { 'background-color': 'transparent' }});
          TweenLite.set(bottomBlock, { css: { 'transform-origin': 'top left' }});
          this.$router.push(this.prePage.path === 'home' ? '/home' : `/home/${this.prePage.path}`);
        })
        .add(TweenLite.to(router, .2, { opacity: 1 })).pause();
    },
    gotoNextPage() {
      this.nextPageTimeline.play();
    },
    gotoPrePage() {
      this.prePageTimeline.play();
    },
    wheel(event) {
      this.scrollAmount += event.deltaY;
      this.scroll();
    },
    touchmove(event) {
      if (!this.touchStarted) {
        this.touchStarted = true;
        this.touchStart = event.touches[0].clientY;
      }
      this.scrollAmount = 4 * (this.touchStart - event.touches[0].clientY);
      this.scroll();
    },
    scroll() {

      if (
        !this.scrollTimeoutId
        && (!this.nextPageTimeline || !this.nextPageTimeline.isActive())
        && (!this.prePageTimeline || !this.prePageTimeline.isActive())
        && Math.abs(this.scrollAmount) > 50
      ) {

        if (this.scrollAmount > 0 && this.nextPageTimeline) {
          this.nextPageTimeline.play();
          this.scrollTimeoutId = setTimeout(() => {
            if (this.scrollAmount < 400) {
              this.nextPageTimeline.reverse().add(() => {
                this.updateAnimations();
              }, 0);
            }
          }, 200);
        } else if (this.prePageTimeline) {
          this.prePageTimeline.play();
          this.scrollTimeoutId = setTimeout(() => {
            if (this.scrollAmount > -400) {
              this.prePageTimeline.reverse().add(() => {
                this.updateAnimations();
              }, 0);
            }
          }, 200);
        }

      }
    },
  },
});
</script>
