import { useUserStore } from "~/store/useUserStore";

type User = {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

export default defineNuxtRouteMiddleware(async () => {
  const store = useUserStore();

  try {
    const response = await myApiFetch<User>("/me", {
      method: "GET",
    });

    store.storeUser(response);
  } catch (e) {
    store.logout();
    authCookie.deleteToken();
    return navigateTo("/auth/login", { replace: true });
  }
});
