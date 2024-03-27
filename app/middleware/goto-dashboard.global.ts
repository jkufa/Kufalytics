
/**
 * Until a landing page is created, redirect to dashboard by default
 */
export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to.path)
  if (to.path === '/') {
    return navigateTo('/dashboard');
  }
})
