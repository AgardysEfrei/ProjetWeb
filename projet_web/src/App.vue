<script setup>
import { ref } from 'vue'
import BaseLayout from './components/BaseLayout.vue'
import HomePage from './pages/HomePage.vue'
import MailWriterPage from './pages/MailWriterPage.vue'
import Dashboard from './pages/Dashboard.vue'
import Sidebar from './components/Sidebar.vue'

const currentPage = ref('Inbox')
const sentMails = ref([])
const sidebarSelection = ref('Inbox')

// 🟢 Lorsqu'on clique sur un bouton du sidebar
function handleSidebarChange(selection) {
  currentPage.value = selection
  sidebarSelection.value = selection
}

// 🟢 Après envoi d'un mail
function handleSendMail(mail) {
  sentMails.value.push(mail)
  currentPage.value = 'Inbox'
  sidebarSelection.value = 'Inbox'
}

// 🏠 Revenir à la boîte de réception sans bouton sélectionné
function handleGoHome() {
  currentPage.value = 'Inbox'
  sidebarSelection.value = null // ⛔ désélectionner
}

// Pour exposer la fonction à Header
defineExpose({ handleGoHome })
</script>

<template>
  <base-layout>
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
          @back="() => currentPage = 'Inbox'"
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
