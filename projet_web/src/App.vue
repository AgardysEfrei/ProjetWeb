<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const user = computed(() => store.getters.user);
import BaseLayout from './components/BaseLayout.vue'
import HomePage from './pages/HomePage.vue'
import UserPage from './pages/UserPage.vue';
import MailWriterPage from './pages/MailWriterPage.vue'
import { ref } from 'vue'
import inbox from './components/inbox.vue'

const currentPage = ref('home')
const sentMails = ref([])

function goToMailWriter() {
  currentPage.value = 'writer'
}
function goToHome() {
  currentPage.value = 'home'
}
function goToUserPage() {
  currentPage.value = 'user'
}
function handleSendMail(mail) {
  sentMails.value.push(mail)
  goToHome()
}
</script>

<template>
  <base-layout @show-profile="goToUserPage" @show-home="goToHome">
    <home-page v-if="currentPage === 'home'" @create-message="goToMailWriter" :sent-mails="sentMails" />
    <MailWriterPage v-else-if="currentPage === 'writer'" @back="goToHome" @send-mail="handleSendMail" />
    <UserPage v-else :user="user" />
  </base-layout>
</template>
