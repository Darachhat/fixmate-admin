<template>
  <div class="layout-container">
    <aside class="sidebar">
      <div class="brand">
        <h2>FixMate Admin</h2>
      </div>
      <nav class="nav">
        <NuxtLink to="/" class="nav-item">Dashboard</NuxtLink>
        <NuxtLink to="/technicians" class="nav-item">Technicians</NuxtLink>
        <NuxtLink to="/users" class="nav-item">Users</NuxtLink>
        <NuxtLink to="/services" class="nav-item">Services</NuxtLink>
        <NuxtLink to="/jobs" class="nav-item">Jobs</NuxtLink>
        <NuxtLink to="/payments" class="nav-item">Payments</NuxtLink>
        <NuxtLink to="/disputes" class="nav-item">Disputes</NuxtLink>
      </nav>
      <div class="user-panel">
         <button @click="logout" class="btn btn-logout">Logout</button>
      </div>
    </aside>
    <main class="main-content">
      <header class="topbar">
        <div class="breadcrumbs">Admin Portal</div>
        <div class="profile-info" v-if="user">
          {{ user.email }} ({{ user.role }})
        </div>
      </header>
      <div class="content-wrapper">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const user = computed(() => authStore.user)
const router = useRouter()

const logout = () => {
  authStore.logout()
}
</script>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background-color: var(--color-bg-sidebar);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
}

.brand {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}
.brand h2 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-primary);
}

.nav {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  font-size: 0.9rem;
  transition: all 0.2s;
}

.nav-item:hover, .router-link-active {
  background-color: var(--color-bg-card);
  color: var(--color-text-main);
}
.router-link-active {
  color: var(--color-primary);
  background-color: rgba(99, 102, 241, 0.1);
}

.user-panel {
  padding: 1rem;
  border-top: 1px solid var(--color-border);
}

.btn-logout {
  width: 100%;
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
}
.btn-logout:hover {
  border-color: var(--color-error);
  color: var(--color-error);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-main);
}

.topbar {
  height: 64px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: var(--color-bg-main);
}

.content-wrapper {
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
}
</style>
