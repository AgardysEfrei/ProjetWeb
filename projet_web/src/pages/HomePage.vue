<script setup>
import { ref, reactive } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import MailViewer from '../components/MailViewer.vue'
import MailComposer from '../components/MailComposer.vue'
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

const mails = {
  Inbox: [
    { id: 1, sender: 'test@example.com', subject: 'TEST !!!!!!!!!', body: 'Et est admodum mirum videre plebem innumeram mentibus ardore quodam infuso cum dimicationum curulium eventu pendentem. haec similiaque memorabile nihil vel serium agi Romae permittunt. ergo redeundum ad textum.\nProcedente igitur mox tempore cum adventicium nihil inveniretur, relicta ora maritima in Lycaoniam adnexam Isauriae se contulerunt ibique densis intersaepientes itinera praetenturis provincialium et viatorum opibus pascebantur.\nEt hanc quidem praeter oppida multa duae civitates exornant Seleucia opus Seleuci regis, et Claudiopolis quam deduxit coloniam Claudius Caesar. Isaura enim antehac nimium potens, olim subversa ut rebellatrix interneciva aegre vestigia claritudinis pristinae monstrat admodum pauca.\nEt hanc quidem praeter oppida multa duae civitates exornant Seleucia opus Seleuci regis, et Claudiopolis quam deduxit coloniam Claudius Caesar. Isaura enim antehac nimium potens, olim subversa ut rebellatrix interneciva aegre vestigia claritudinis pristinae monstrat admodum pauca.\nQuam quidem partem accusationis admiratus sum et moleste tuli potissimum esse Atratino datam. Neque enim decebat neque aetas illa postulabat neque, id quod animadvertere poteratis, pudor patiebatur optimi adulescentis in tali illum oratione versari. Vellem aliquis ex vobis robustioribus hunc male dicendi locum suscepisset; aliquanto liberius et fortius et magis more nostro refutaremus istam male dicendi licentiam. Tecum, Atratine, agam lenius, quod et pudor tuus moderatur orationi meae et meum erga te parentemque tuum beneficium tueri debeo' },
    { id: 2, sender: 'test@example.com', subject: 'TEST !!!!!!!!!', body: 'truc much, machin truc, blabla, etc.' },
    { id: 3, sender: 'test@example.com', subject: 'TEST !!!!!!!!!', body: 'truc much, machin truc, blabla, etc.' },
  ],
  Sent: [],
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

const showComposer = ref(false)

function openComposer() {
  showComposer.value = true
}
function closeComposer() {
  showComposer.value = false
}
</script>

<template>
  <div class="main-layout">
    <Sidebar :selected="state.selectedCategory" @update:selected="handleCategoryChange" />
    <div class="content">
      <div class="mail-section">
        <BaseButton @click="openComposer">Créer un message</BaseButton>
        <ul>
          <MailItem v-for="mail in mails[state.selectedCategory]" :key="mail.id" :mail="mail" @select="handleSelectMail" />
        </ul>
        <MailComposer v-if="showComposer" />
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
</style>
