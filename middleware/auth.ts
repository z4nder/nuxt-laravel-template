export default defineNuxtRouteMiddleware(() => {
  const token = authCookie.getToken();
  if (!token) return navigateTo("/auth/login", { replace: true });
});
