<script setup>
import { useStore } from 'vuex';
import * as msal from '@azure/msal-browser';
import BaseButton from './BaseButton.vue';

const store = useStore();

const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_APP_OAUTH_CLIENT_ID
  },
  cache: {
    cacheLocation: "sessionStorage"
  }
});

const signIn = async () => {
  await msalInstance.initialize();
  const authResult = await msalInstance.loginPopup({ scopes: ["User.Read"] });
  msalInstance.setActiveAccount(authResult.account);
  store.commit('setUser', authResult.account); // 👈 this sets user in Vuex
};
</script>

<template>
  <BaseButton @click="signIn">Sign In with Microsoft</BaseButton>
</template>
