<template>
  <NuxtLayout :name="layout"> AUTH MDFK </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });
const layout = "auth";
</script>
