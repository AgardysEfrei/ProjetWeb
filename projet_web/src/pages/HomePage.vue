<script setup>
import { ref, reactive } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import MailViewer from '../components/MailViewer.vue'
import MailItem from '../components/MailItem.vue'

const clickCount = ref(0)

function handleButtonClick() {
  clickCount.value++
  return new Promise((resolve) => {
    setTimeout(resolve, clickCount.value * 1000)
  })
}

const state = reactive({
  selectedCategory: 'Inbox',
  selectedMail: null
})

const props = defineProps({
  sentMails: {
    type: Array,
    default: () => []
  }
})

const mails = {
  Inbox: [
    { id: 1, sender: 'test@example.com', subject: 'TEST 1', body: 'Et est admodum mirum videre plebem innumeram mentibus ardore quodam infuso cum dimicationum curulium eventu pendentem. haec similiaque memorabile nihil vel serium agi Romae permittunt. ergo redeundum ad textum.\nProcedente igitur mox tempore cum adventicium nihil inveniretur, relicta ora maritima in Lycaoniam adnexam Isauriae se contulerunt ibique densis intersaepientes itinera praetenturis provincialium et viatorum opibus pascebantur.\nEt hanc quidem praeter oppida multa duae civitates exornant Seleucia opus Seleuci regis, et Claudiopolis quam deduxit coloniam Claudius Caesar. Isaura enim antehac nimium potens, olim subversa ut rebellatrix interneciva aegre vestigia claritudinis pristinae monstrat admodum pauca.\nEt hanc quidem praeter oppida multa duae civitates exornant Seleucia opus Seleuci regis, et Claudiopolis quam deduxit coloniam Claudius Caesar. Isaura enim antehac nimium potens, olim subversa ut rebellatrix interneciva aegre vestigia claritudinis pristinae monstrat admodum pauca.\nQuam quidem partem accusationis admiratus sum et moleste tuli potissimum esse Atratino datam. Neque enim decebat neque aetas illa postulabat neque, id quod animadvertere poteratis, pudor patiebatur optimi adulescentis in tali illum oratione versari. Vellem aliquis ex vobis robustioribus hunc male dicendi locum suscepisset; aliquanto liberius et fortius et magis more nostro refutaremus istam male dicendi licentiam. Tecum, Atratine, agam lenius, quod et pudor tuus moderatur orationi meae et meum erga te parentemque tuum beneficium tueri debeo' },
    { id: 2, sender: 'test@example.com', subject: 'TEST 2', body: 'truc much, machin truc, blabla, etc.' },
    { id: 3, sender: 'test@example.com', subject: 'TEST 3', body: 'truc much, machin truc, blabla, etc.' },
  ],
  Sent: props.sentMails,
  Drafts: [],
  Trash: []
}

function handleSelectMail(mail) {
  state.selectedMail = mail
}

function handleCategoryChange(category) {
  state.selectedCategory = category
  state.selectedMail = null
}

const tab = ref('recu')
</script>

<template>
  <div class="main-layout">
    <Sidebar :selected="state.selectedCategory" @update:selected="handleCategoryChange" />
    <div class="content">
      <div class="mail-section">
        <BaseButton @click="$emit('create-message')">Créer un message</BaseButton>
        <div class="tabs">
          <button :class="{active: tab === 'recu'}" @click="tab = 'recu'">Reçus</button>
          <button :class="{active: tab === 'envoye'}" @click="tab = 'envoye'">Envoyés</button>
        </div>
        <ul v-if="tab === 'recu'">
          <MailItem v-for="mail in mails['Inbox']" :key="mail.id" :mail="mail" @select="handleSelectMail" />
        </ul>
        <ul v-else>
          <MailItem v-for="mail in mails['Sent']" :key="mail.id" :mail="mail" @select="handleSelectMail" />
        </ul>
      </div>
      <MailViewer :mail="state.selectedMail" />
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f6fa;
}
.sidebar {
  flex-shrink: 0;
}
.content {
  flex: 1;
  display: flex;
  gap: 2rem;
  padding: 2rem;
}
.mail-section {
  min-width: 420px;
}
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.tabs button {
  background: #e6eaff;
  border: none;
  border-radius: 4px 4px 0 0;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  font-weight: bold;
  color: #222;
  transition: background 0.2s;
}
.tabs button.active {
  background: #e6eaff;
  color: #222;
}
</style>
