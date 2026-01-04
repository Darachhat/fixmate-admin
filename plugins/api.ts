import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const token = useCookie('token') // Use Nuxt cookie for SSR compat if needed, or stick to localStorage in store?
  // Admin dashboard usually fine with client-side localStorage or cookies.
  // Using useCookie is better for Nuxt.

  const api = axios.create({
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Request Interceptor
  api.interceptors.request.use((config) => {
    const tokenCookie = useCookie('token')
    if (tokenCookie.value) {
      config.headers.Authorization = `Bearer ${tokenCookie.value}`
    }
    return config
  })

  // Response Interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Redirect to login if 401
        const tokenCookie = useCookie('token')
        tokenCookie.value = null
        navigateTo('/login')
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api: api
    }
  }
})
