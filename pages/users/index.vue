<template>
  <NuxtLayout :name="layout"> </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });
const layout = "auth";

const { fetchUsers } = useUser();

onMounted(async () => {
  await fetchUsers();
});
</script>
