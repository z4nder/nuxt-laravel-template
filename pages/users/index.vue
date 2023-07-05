<template>
  <NuxtLayout :name="layout"> USERS MDFK </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });
const layout = "auth";
</script>
