<template>
  <div v-if="mail" class="mail-viewer">
    <h2 class="mail-subject">{{ mail.subject }}</h2>
    <div class="mail-meta">
      <span><strong>De :</strong> {{ mail.sender }}</span>
    </div>
    <hr />
    <div class="mail-body">
      <pre>{{ mail.body }}</pre>
    </div>
  </div>
  <div v-else class="mail-viewer-empty">
    <em>Sélectionnez un message pour voir son contenu.</em>
  </div>
</template>

<script setup>
const props = defineProps({
  mail: Object
})
</script>

<style scoped>
.mail-viewer {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.mail-subject {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.mail-meta {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.mail-body {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
}

.mail-viewer-empty {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  color: #999;
  font-style: italic;
  flex: 1;
}
</style>
