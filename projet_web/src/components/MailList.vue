<template>
  <div class="mail-list">
    <h2>Inbox</h2>
    <ul>
      <MailItem v-for="mail in mails" :key="mail.id" :mail="mail" @select="onSelectMail" />
    </ul>
  </div>
</template>

<script setup>
import MailItem from './MailItem.vue'

const onSelectMail = (mail) => {
  alert(`Selected mail from: ${mail.sender}`)
}
</script>

<style scoped>
.mail-list {
  background: rgb(2, 5, 160);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 1rem;
  margin: 1rem auto;
  max-width: 400px;
}
.mail-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #000;
}
.mail-item:last-child {
  border-bottom: none;
}
</style>
