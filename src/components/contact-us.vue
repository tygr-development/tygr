<template>

<div>

  <div id="contact-container">

    <div v-if="contactMethodsShown" id="fab-background"/>

    <div
      v-if="fabRecycler"
      class="contact-item clickable"
      style="grid-area: fab-3"
      @click="showContactDialog('email')"
      data-cy="email-btn">

      <h4 
        class="contact-text"
        v-show="contactMethodsShown">
        Email
      </h4>

      <mdc-fab 
        :class="{ 'mdc-fab--exited': !contactMethodsShown}"
        mini
        icon="email"/>

    </div>

    <div
      v-if="fabRecycler"
      class="contact-item clickable"
      style="grid-area: fab-2"
      @click="showContactDialog('phone')"
      data-cy="phone-btn">

      <h4
        class="contact-text"
        v-show="contactMethodsShown">
        Phone
      </h4>

      <mdc-fab 
        :class="{ 'mdc-fab--exited': !contactMethodsShown}"
        mini
        icon="phone"/>

    </div>

    <mdc-button 
      class="clickable"
      id="contact-btn"
      raised
      @click="showContactMethods"
      data-cy="show-contact-methods">
      Contact
    </mdc-button>

  </div>
  
  <mdc-dialog 
    class="clickable"
    ref="contact-dialog"
    :title="contact.name || ''"
    id="contact-info-dialog"
    cancel=""
    data-cy="contact-dialog">
      
      <a :href="contact.href || ''">
        <h3 ref="contact-info" style="display: inline;">{{ contact.value || ''}}</h3>
      </a>

      <mdc-button
        @click="copyContactInfo">
        <mdc-icon icon="content_copy"/>
      </mdc-button>

  </mdc-dialog>

</div>

</template>

<style lang="scss" scoped="true">

@import "@material/fab/mixins";

#contact-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template:
    1fr 50px 50px 50px 50px // rows
    / 1fr 20px auto; // columns
  grid-template-areas:
    "chat-box  .            ."
    "chat-box  .        fab-3"
    "chat-box  .        fab-2"
    "chat-box  .        fab-1"
    "chat-btn  .  contact-btn";
  justify-items: end;
}
#chat-box {
  grid-area: chat-box;
  align-self: stretch;
  justify-self: stretch;
  padding: 10px 0px 10px 0px;
  display: grid;
  grid-template:
    auto 1fr 50px // rows
    / 1fr auto; // columns
  grid-template-areas:
    "       .     icons"
    "messages  messages"
    "text-box      send";

}
@media #{$phablet} {
  #chat-box {
    grid-area: 1 / 1 / 6 / 4; // full screen
    z-index: 2;
    padding: 0;
  }
}
#chat-messages {
  grid-area: messages;
  align-self: stretch;
  justify-self: stretch;
  overflow-y: auto;
}
.clickable {
  pointer-events: all;
}
.contact-item {
  display: flex;
  align-items: center;
  margin-right: 15%;
  margin-left: 10px;
  margin-bottom: 15px;
  margin-top: 15px;
}
#contact-btn {
  grid-area: contact-btn;
  margin-right: 15%;
  margin-left: 15px;
}
.contact-text {
  display: inline;
  margin-right: 20px;
}
.contact-info {
  display: inline;
  margin: 20px;
}
.chat-icon {
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
  cursor:pointer;
  overflow: hidden;
  outline:none;
}
.message {
  display: table;
  color: white;
  padding: 3px 7px 3px 7px;
  margin: 3px 7px 3px 7px;
  border-radius: 5px;
  max-width: 70%;
  
  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
.customer-message {
  margin-right: auto;
  background-color: $primary;
}
.developer-message {
  margin-left: auto;
  background-color: $secondary;
}
#fab-background {
  background-color: white;
  grid-area: 2 / 3 / 5 / 4;
  justify-self: stretch;
}

</style>

<script lang="ts">

import { Observable } from 'rxjs';

import Vue from 'vue';

import axios from 'axios';

import * as DeviceModule from '../modules/device';

const contactMethods = {
  email: {
    name: 'Email',
    href: 'mailto:develop@tygr.info',
    value: 'develop@tygr.info',
  },
  phone: {
    name: 'Phone',
    href: 'tel:8024558947',
    value: '(802) 455-TYGR',
  },
};

export default Vue.extend({
  data: () => ({
    contact: {},
    contactMethodsShown: false,
    contactMethodsTimeoutId: null,
    fabRecycler: true,
    chatBoxShown: false,
    newSubject: '',
    message: '',
    scrollChatTimeoutId: null,
  }),
  subscriptions() { return {
    mobile: this.$store.select$(DeviceModule.smallerOrEqTo('phablet')),
  }; },
  methods: {
    showContactMethods() {
      if (this.contactMethodsTimeoutId) {
        this.hideContactMethods();
      } else {
        this.contactMethodsShown = true;
        this.contactMethodsTimeoutId = setTimeout(this.hideContactMethods, 4000);
      }
    },
    hideContactMethods() {
      this.contactMethodsShown = false;
      this.recycle();
      if (this.contactMethodsTimeoutId) {
        clearTimeout(this.contactMethodsTimeoutId);
        this.contactMethodsTimeoutId = null;
      }
    },
    showContactDialog(type: string) {
      if (this.contactMethodsShown) {
        this.hideContactMethods();

        if (type === 'email') {
          this.contact = contactMethods.email;
        } else {
          this.contact = contactMethods.phone;
        }
        this.$refs['contact-dialog'].show();
      }
    },
    copyContactInfo() {
      const contactInfo = this.$refs['contact-info'].$el;
      const range = document.createRange();
      range.selectNode(contactInfo);
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    },

    // HACKY BUG FIX
    // For some reason the hide fab css class shifts the icon to the left
    // Dissapearing it and reappearing it makes it go back to normal
    recycle() {

      setTimeout(
        () => {
          this.fabRecycler = false;
          setTimeout(() => this.fabRecycler = true, 50);
        },
        500,
      );
    },
  },
});
</script>
