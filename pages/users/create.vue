<template>
  <NuxtLayout :name="layout">
    <v-form @onSubmit="submit">
      <div class="flex justify-center text-center items-center text-red-500">
        {{ errors?.general }}
      </div>
      <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <v-input
            id="name"
            v-model="form.name"
            :value="form.name"
            :error="errors?.name"
            label="Name"
            type="text"
          />
        </div>
        <div class="sm:col-span-3">
          <v-input
            id="email"
            v-model="form.email"
            :value="form.email"
            :error="errors?.email"
            label="Email"
            type="email"
          />
        </div>
        <div class="sm:col-span-3">
          <v-input
            id="password"
            v-model="form.password"
            :value="form.password"
            :error="errors?.password"
            label="password"
            type="password"
          />
        </div>
        <div class="sm:col-span-3">
          <v-input
            id="password_confirmation"
            v-model="form.password_confirmation"
            :value="form.password_confirmation"
            :error="errors?.password_confirmation"
            label="Confirm password"
            type="password"
          />
        </div>
        <div class="sm:col-span-3">
          <v-select
            id="roles"
            :options="roles"
            option-value="id"
            option-text="name"
            v-model="form.roles"
            :multiple="true"
            label="Roles"
          />
        </div>
      </div>
    </v-form>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });
const layout = "auth";
const { form, store, errors } = useUser();
const { fetchRoles, roles } = useRole();

onMounted(async () => {
  await fetchRoles();
});

const submit = async () => {
  await store(form);
};
</script>
