<script setup>
import SigninButton from './components/SigninButton.vue'
import UserProfile from './components/UserProfile.vue'
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

const currentPage = computed(() => store.getters.currentPage)
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
  <main>
  </main>
  <base-layout>
    <HomePage v-if="currentPage === 'home'" @create-message="goToMailWriter" :sent-mails="sentMails" />
    <UserPage v-else-if="currentPage === 'user'"  user=""/>
    <MailWriterPage v-else @back="goToHome" @send-mail="handleSendMail" />
  </base-layout>
</template>
