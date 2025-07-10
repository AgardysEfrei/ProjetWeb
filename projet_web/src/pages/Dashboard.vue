<script setup>
import { computed } from 'vue'
import { Chart, registerables } from 'chart.js'
import { Pie, Bar } from 'vue-chartjs'

Chart.register(...registerables)

const props = defineProps({
  mails: {
    type: Object,
    required: true
  }
})

// 📊 Compter les mails par catégorie
const pieData = computed(() => {
  const counts = {
    Inbox: props.mails.Inbox?.length || 0,
    Sent: props.mails.Sent?.length || 0,
    Drafts: props.mails.Drafts?.length || 0,
    Trash: props.mails.Trash?.length || 0
  }

  return {
    labels: ['Reçus', 'Envoyés', 'Brouillons', 'Corbeille'],
    datasets: [{
      backgroundColor: ['#4299e1', '#48bb78', '#f6ad55', '#e53e3e'],
      data: [counts.Inbox, counts.Sent, counts.Drafts, counts.Trash]
    }]
  }
})

// 📅 Activité par date (barres)
const barData = computed(() => {
  const allMails = [
    ...props.mails.Inbox || [],
    ...props.mails.Sent || [],
    ...props.mails.Drafts || [],
    ...props.mails.Trash || []
  ]

  const grouped = {}

  allMails.forEach(mail => {
    const date = mail.date
    if (date) {
      grouped[date] = (grouped[date] || 0) + 1
    }
  })

  const sortedDates = Object.keys(grouped).sort()
  const counts = sortedDates.map(date => grouped[date])

  return {
    labels: sortedDates,
    datasets: [{
      label: 'Mails par jour',
      backgroundColor: '#805ad5',
      data: counts
    }]
  }
})

const pieOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' }
  }
}

const barOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
</script>

<template>
  <div class="dashboard-wrapper">
    <div class="chart-card">
      <h3>📊 Répartition des mails</h3>
      <Pie :data="pieData" :options="pieOptions" />
    </div>

    <div class="chart-card">
      <h3>📈 Activité quotidienne</h3>
      <Bar :data="barData" :options="barOptions" />
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}

.chart-card {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.chart-card h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #2d3748;
}
</style>
