<template>
  <nav class="sidebar">
    <ul>
      <li v-for="item in items" :key="item" :class="{active: item === selected}" @click="$emit('update:selected', item)">
        {{ item }}
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  selected: String
})
const items = ['Inbox', 'Sent', 'Drafts', 'Trash']
</script>

<style scoped>
.sidebar {
  width: 180px;
  background: #222b;
  color: #fff;
  padding: 1rem 0;
  border-radius: 8px;
  min-height: 400px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
li.active, li:hover {
  background: #2a3cff;
  color: #fff;
}
</style>
