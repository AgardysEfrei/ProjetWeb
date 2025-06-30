<script setup>
import { defineProps, defineEmits } from 'vue';
import * as msal from '@azure/msal-browser';

const props = defineProps({
  user: Object
});

const emit = defineEmits(['userChanged']);

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
  const requestedScopes = {
    scopes: ["User.Read"]
  };
  const authResult = await msalInstance.loginPopup(requestedScopes);
  msalInstance.setActiveAccount(authResult.account);
  emit('userChanged', authResult.account);
};
</script>

<template>
  <button @click="signIn">Sign In with Microsoft</button>
  <div v-if="user">
    <p>Welcome, {{ user.name }}</p>
  </div>
</template>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
