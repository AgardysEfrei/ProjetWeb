<script setup>
import BaseLayout from './components/BaseLayout.vue'
import HomePage from './pages/HomePage.vue'
import UserPage from './pages/UserPage.vue';
import MailWriterPage from './pages/MailWriterPage.vue'
import { ref } from 'vue'

const currentPage = ref('home')

function goToMailWriter() {
  currentPage.value = 'writer'
}
function goToHome() {
  currentPage.value = 'home'
}
</script>

<template>
  <base-layout>
    <home-page v-if="currentPage === 'home'" @create-message="goToMailWriter" />
    <MailWriterPage v-else @back="goToHome" />
  </base-layout>
</template>
