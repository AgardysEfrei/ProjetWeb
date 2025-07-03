<template>
  <header class="header">
    <div class="left">
      <base-button color="primary">
        <i class="fas fa-home"></i> Home
      </base-button>
    </div>
    <div class="right">
      <SigninButton/>
      <UserProfile />
    </div>
  </header>
</template>

<script setup>
import BaseButton from './BaseButton.vue'
import SigninButton from './SigninButton.vue'
import UserProfile from './UserProfile.vue'
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const user = computed(() => store.getters.user);
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #42b983;
  color: white;
  padding: 1em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.left, .right {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

i {
  margin-right: 5px;
}
</style>
