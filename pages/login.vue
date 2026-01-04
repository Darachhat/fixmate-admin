<template>
  <div class="login-card card">
    <div class="header">
      <h1>FixMate Admin</h1>
      <p>Sign in to access control panel</p>
    </div>
    
    <form @submit.prevent="handleLogin">
      <div v-if="error" class="alert error">{{ error }}</div>
      
      <div class="form-group">
        <label class="label">Email</label>
        <input v-model="email" type="email" class="input" placeholder="admin@fixmate.com" required />
      </div>
      
      <div class="form-group">
        <label class="label">Password</label>
        <input v-model="password" type="password" class="input" placeholder="••••••••" required />
      </div>
      
      <button type="submit" class="btn btn-primary full-width" :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const authStore = useAuthStore()

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
  } catch (e) {
    error.value = e.message || "Authentication failed"
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}
.header h1 {
  margin: 0;
  color: var(--color-primary);
}
.header p {
  color: var(--color-text-muted);
  margin-top: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.full-width {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
}

.alert {
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
.alert.error {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
  border: 1px solid var(--color-error);
}
</style>
