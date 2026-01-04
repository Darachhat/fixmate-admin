<template>
  <div>
    <h1 class="page-title">Dashboard Overview</h1>
    
    <div class="stats-grid">
      <div class="stat-card card">
          <span class="stat-label">Total Users</span>
          <div class="stat-value">--</div>
      </div>
      <div class="stat-card card">
          <span class="stat-label">Active Technicians</span>
          <div class="stat-value">--</div>
      </div>
      <div class="stat-card card">
          <span class="stat-label">Jobs Today</span>
          <div class="stat-value">--</div>
      </div>
       <div class="stat-card card">
          <span class="stat-label">Pending Disputes</span>
          <div class="stat-value">--</div>
      </div>
    </div>

    <!-- Integrate widgets later -->
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

// TODO: Fetch stats from API
</script>

<style scoped>
.page-title {
  margin-top: 0;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
}
.stat-label {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}
.stat-value {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-main);
  margin-top: 0.5rem;
}
</style>
