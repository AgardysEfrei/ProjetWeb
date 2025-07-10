<template>
  <div v-if="user">
    <p class="user-welcome" @click="$emit('show-profile')" style="cursor:pointer;user-select:none;">
      Bienvenue, {{ user.username }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = computed(() => store.getters.user);
const emit = defineEmits(['show-profile'])
console.log(user);
</script>