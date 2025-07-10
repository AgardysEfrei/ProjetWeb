<script setup>
import { ref } from 'vue'
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const user = computed(() => store.getters.user);
import BaseLayout from './components/BaseLayout.vue'
import HomePage from './pages/HomePage.vue'
import MailWriterPage from './pages/MailWriterPage.vue'
import Dashboard from './pages/Dashboard.vue'
import Sidebar from './components/Sidebar.vue'
import inbox from './components/inbox.vue'

const currentPage = ref('Inbox')
const sentMails = ref([])
const sidebarSelection = ref('Inbox')

function handleSidebarChange(selection) {
  currentPage.value = selection
  sidebarSelection.value = selection
}
function goToUserPage() {
  currentPage.value = 'user'
}
function handleSendMail(mail) {
  sentMails.value.push(mail)
  currentPage.value = 'Inbox'
  sidebarSelection.value = 'Inbox'
}

function handleGoHome() {
  currentPage.value = 'Inbox'
  sidebarSelection.value = null
}

defineExpose({ handleGoHome })
</script>

<template>
  <base-layout @show-profile="goToUserPage" @show-home="goToHome">
    <div class="app-container">
      <Sidebar :selected="sidebarSelection" @update:selected="handleSidebarChange" />

      <div class="main-content">
        <HomePage
          v-if="['Inbox', 'Sent', 'Drafts', 'Trash'].includes(currentPage)"
          :sent-mails="sentMails"
          :initial-category="currentPage"
          @create-message="() => currentPage = 'writer'"
        />
        <MailWriterPage
          v-else-if="currentPage === 'writer'"
         -if="currentPage === 'writer'" @back="() => currentPage = 'Inbox'"
          @send-mail="handleSendMail"
        />
        <Dashboard
          v-else-if="currentPage === 'dashboard'"
          :mails="{
            Inbox: [
              { id: 1, sender: 'a@example.com', subject: 'Test', date: '2025-07-06' },
              { id: 2, sender: 'b@example.com', subject: 'Hello', date: '2025-07-06' }
            ],
            Sent: sentMails,
            Drafts: [],
            Trash: []
          }"
        />
        <UserPage v-else :user="user" />
      </div>
    </div>
  </base-layout>
</template>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}
.main-content {
  flex: 1;
  overflow-y: auto;
}
</style>
