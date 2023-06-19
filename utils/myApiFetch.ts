import { $fetch } from "ofetch";

export async function myApiFetch<T>(path: RequestInfo, { ...options }) {
  const { backendUrl } = useRuntimeConfig().public;

  const authToken = authCookie.getToken();

  const headers = {
    accept: "application/json",
    contentType: "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  try {
    return await $fetch<T>(path, {
      baseURL: backendUrl,
      ...options,
      headers,
    });
  } catch (error) {
    console.log("");

    throw error;
  }
}
