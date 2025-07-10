<script setup>
import { ref, reactive, computed, watch } from 'vue'
import jsPDF from 'jspdf'
import BaseButton from '../components/BaseButton.vue'
import MailViewer from '../components/MailViewer.vue'
import MailItem from '../components/MailItem.vue'
import Dashboard from './Dashboard.vue'

const emit = defineEmits(['create-message', 'update:selected'])

const props = defineProps({
  sentMails: { type: Array, default: () => [] },
  initialCategory: { type: String, default: 'Inbox' }
})

import {useStore} from "vuex";
import {onMounted} from "vue"
import {signIn} from "@/lib/microsoftGraph.js";
const store = useStore();
const mails = computed(() => store.getters.emails);

const state = reactive({
  selectedCategory: props.initialCategory,
  selectedMail: null
})

const searchQuery = ref('')
const searchFilter = ref('all')
const exportFormat = ref('pdf')

const mails = reactive({
  Inbox: [
    { id: 1, sender: 'test@example.com', subject: 'TEST 1', body: 'Contenu du message 1', date: '2025-07-06' },
    { id: 2, sender: 'demo@example.com', subject: 'TEST 2', body: 'Message structuré.', date: '2025-07-05' },
    { id: 3, sender: 'john@example.com', subject: 'TEST 3', body: 'Dernier contenu.', date: '2025-07-04' }
  ],
  Sent: props.sentMails,
  Drafts: [],
  Trash: []
})

watch(() => props.sentMails, () => {
  mails.Sent = props.sentMails
})

const filteredMails = computed(() => {
  if (state.selectedCategory === 'dashboard') return []
  const list = mails[state.selectedCategory] || []
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return list

  return list.filter(mail => {
    const sender = mail.sender?.toLowerCase() || ''
    const subject = mail.subject?.toLowerCase() || ''
    const date = String(mail.date).toLowerCase()
    return (
      (searchFilter.value === 'sender' && sender.includes(query)) ||
      (searchFilter.value === 'subject' && subject.includes(query)) ||
      (searchFilter.value === 'date' && date.includes(query)) ||
      (searchFilter.value === 'all' &&
        (sender.includes(query) || subject.includes(query) || date.includes(query)))
    )
  })
})

function handleSelectMail(mail) {
  store.dispatch('selectMail', state.selectedMail?.id === mail.id ? null : mail)
}

function handleCategoryChange(category) {
  state.selectedCategory = category
  state.selectedMail = null
}

function handleDeleteMail(id) {
  const list = mails[state.selectedCategory]
  const index = list.findIndex(mail => mail.id === id)
  if (index !== -1) {
    list.splice(index, 1)
    if (state.selectedMail?.id === id) {
      state.selectedMail = null
    }
  }
}

function exportCSV() {
  const headers = ['Expéditeur', 'Sujet', 'Date', 'Contenu']
  const rows = filteredMails.value.map(mail => [
    `"${mail.sender}"`, `"${mail.subject}"`, `"${mail.date}"`, `"${mail.body.replace(/\n/g, ' ').replace(/"/g, '""')}"`
  ])
  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', 'emails.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function exportPDF() {
  const doc = new jsPDF()
  const pageHeight = doc.internal.pageSize.height
  const pageWidth = doc.internal.pageSize.width
  const now = new Date()
  const dateStr = now.toLocaleDateString()
  const timeStr = now.toLocaleTimeString()
  const mailsToExport = filteredMails.value

  let y = 30
  let page = 1

  function addHeader() {
    doc.setFontSize(16)
    doc.text('Rapport des Emails', 14, 15)
    doc.setFontSize(11)
    doc.text(`Date : ${dateStr} ${timeStr}`, pageWidth - 60, 15)
    doc.line(10, 18, pageWidth - 10, 18)
  }

  function addFooter() {
    doc.setFontSize(10)
    doc.text(`Page ${page}`, pageWidth / 2 - 10, pageHeight - 10)
  }

  addHeader()
  doc.setFontSize(11)
  doc.text(`Nombre total : ${mailsToExport.length}`, 14, y)
  y += 10

  mailsToExport.forEach(mail => {
    doc.setFontSize(12)
    doc.text(`• ${mail.subject}`, 14, y)
    y += 6
    doc.setFontSize(10)
    doc.text(`Expéditeur : ${mail.sender}`, 18, y)
    y += 5
    doc.text(`Date : ${mail.date}`, 18, y)
    y += 5
    const bodyLines = doc.splitTextToSize(mail.body || '', 170)
    doc.text(bodyLines, 18, y)
    y += bodyLines.length * 5 + 4
    if (y > pageHeight - 30) {
      addFooter()
      doc.addPage()
      page++
      y = 30
      addHeader()
    }
  })

  addFooter()
  doc.save('emails.pdf')
}

function handleExport() {
  if (exportFormat.value === 'csv') exportCSV()
  else exportPDF()
}

onMounted(async () => {
  try {
    if (!store.getters.user) {
      console.log("🔐 Utilisateur non connecté, connexion en cours...");
      await signIn();
      console.log("✅ Utilisateur connecté");
    }

    console.log('📩 fetchEmails lancé...');
    await store.dispatch('fetchEmails');
    console.log('✅ emails après chargement :', store.getters.emails);
    console.log('🔐 accessToken =', store.getters.user?.accessToken);

  } catch (error) {
    console.error("Erreur lors de la connexion ou du fetch :", error);
  }
});
</script>

<template>
  <div class="main-layout">
    <div class="content">
            <Dashboard v-if="state.selectedCategory === 'dashboard'" :mails="mails" />

      <template v-else>
      <div class="mail-section">
        <BaseButton @click="$emit('create-message')">➕ Nouveau message</BaseButton>
        <div class="search-wrapper" v-if="searchFilter !== 'date'">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              class="search-input"
              type="text"
              placeholder="Rechercher..."
            />
            <button v-if="searchQuery" class="clear-button" @click="searchQuery = ''">❌</button>
          </div>

          <div class="filter-select">
            <label for="filter">Filtrer :</label>
            <select v-model="searchFilter" id="filter">
              <option value="all">Tous</option>
              <option value="sender">Expéditeur</option>
              <option value="subject">Sujet</option>
              <option value="date">Date</option>
            </select>
            <input
              v-if="searchFilter === 'date'"
              v-model="searchQuery"
              type="date"
              class="date-input"
            />
          </div>

          <div class="export-buttons">
            <select v-model="exportFormat">
              <option value="csv">📄 CSV</option>
              <option value="pdf">🧾 PDF</option>
            </select>
            <button @click="handleExport">Exporter</button>
          </div>

          <ul>
            <MailItem
              v-for="mail in filteredMails"
              :key="mail.id"
              :mail="mail"
              :selected="state.selectedMail?.id === mail.id"
              @select="handleSelectMail"
              @delete="handleDeleteMail"
            />
          </ul>
        </div>

        <MailViewer :mail="state.selectedMail" />
      </template>
    </div>
  </div>
</template>


<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f6fa;
}

.content {
  flex: 1;
  display: flex;
  gap: 2rem;
  padding: 2rem;
}

.mail-section {
  min-width: 420px;
  display: flex;
  flex-direction: column;
}

.create-button {
  margin-bottom: 1rem;
}

.search-wrapper {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  padding: 0.4rem 1rem;
  margin-bottom: 0.8rem;
}

.search-icon {
  margin-right: 0.5rem;
  color: #4a5568;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
}

.clear-button {
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
}

.filter-select {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.date-input {
  padding: 0.4rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
}

.export-buttons {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
</style>
