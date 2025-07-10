<template>
  <nav class="sidebar">
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        :class="{ active: selected === item.id }"
        @click="$emit('update:selected', item.id)"
      >
        <span class="emoji">{{ item.emoji }}</span> {{ item.label }}
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  selected: String
})

const items = [
  { id: 'Inbox', label: 'Reçus', emoji: '📥' },
  { id: 'Sent', label: 'Envoyés', emoji: '✈️' },
  { id: 'Drafts', label: 'Brouillons', emoji: '📝' },
  { id: 'Trash', label: 'Corbeille', emoji: '🗑️' },
  { id: 'dashboard', label: 'Statistiques', emoji: '📊' }
]
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #ffffff;
  padding: 2rem 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.8rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  font-weight: 600;
  color: #2d3748;
  cursor: pointer;
  transition: background 0.2s;
}
.sidebar li.active {
  background-color: #2f855a;
  color: white;
}
.sidebar li:hover {
  background-color: #e6fffa;
}
.emoji {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}
</style>
