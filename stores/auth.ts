import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  role: 'ADMIN' | 'TECHNICIAN' | 'CUSTOMER'
  is_active: boolean
}

interface AuthState {
  user: User | null
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'ADMIN'
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      const { $api } = useNuxtApp()
      const tokenCookie = useCookie('token')

      try {
        const body = new URLSearchParams()
        body.append('username', email)
        body.append('password', password)

        const res = await $api.post('/auth/login', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        const { access_token } = res.data
        tokenCookie.value = access_token
        
        await this.fetchUser()
        
        // Final Check
        if (!this.isAdmin) {
            this.logout()
            throw new Error("Access Denied: Admins only")
        }
        
        navigateTo('/')
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      const { $api } = useNuxtApp()
      try {
        const res = await $api.get('/auth/me')
        this.user = res.data
      } catch (error) {
        this.user = null
      }
    },

    logout() {
      const tokenCookie = useCookie('token')
      tokenCookie.value = null
      this.user = null
      navigateTo('/login')
    }
  }
})
