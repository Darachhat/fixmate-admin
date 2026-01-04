export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const token = useCookie('token')

  if (to.path === '/login') {
      if (token.value && authStore.user) {
          return navigateTo('/')
      }
      return
  }

  if (!token.value) {
    return navigateTo('/login')
  }

  // If token exists but no user loaded, fetch it
  if (!authStore.user) {
      try {
          await authStore.fetchUser()
          if (!authStore.isAdmin) {
              // Not admin
              authStore.logout()
              return navigateTo('/login')
          }
      } catch (e) {
          return navigateTo('/login')
      }
  }
})
