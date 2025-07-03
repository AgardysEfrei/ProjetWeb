<script setup>
import BaseLayout from './components/BaseLayout.vue'
import HomePage from './pages/HomePage.vue'
import UserPage from './pages/UserPage.vue';
import MailWriterPage from './pages/MailWriterPage.vue'
import { ref } from 'vue'

const currentPage = ref('home')
const sentMails = ref([])

function goToMailWriter() {
  currentPage.value = 'writer'
}
function goToHome() {
  currentPage.value = 'home'
}
function handleSendMail(mail) {
  sentMails.value.push(mail)
  goToHome()
}
</script>

<template>
  <base-layout>
    <home-page v-if="currentPage === 'home'" @create-message="goToMailWriter" :sent-mails="sentMails" />
    <MailWriterPage v-else @back="goToHome" @send-mail="handleSendMail" />
  </base-layout>
</template>
