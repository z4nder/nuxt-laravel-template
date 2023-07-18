<template>
  <div>
    <router-link to="/users" v-if="link.length > 0">
      <button
        :type="props.type"
        :class="{
          'bg-primary-400 hover:bg-primary-500  focus:ring-primary-500':
            color == 'primary',
          'bg-secondary-400 hover:bg-secondary-500  focus:ring-secondary-500':
            color == 'secondary',
        }"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <slot />
      </button>
    </router-link>
    <button
      v-else
      :type="props.type"
      :class="{
        'bg-primary-400 hover:bg-primary-500  focus:ring-primary-500':
          color == 'primary',
        'bg-secondary-400 hover:bg-secondary-500  focus:ring-secondary-500':
          color == 'secondary',
      }"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
// como definir tipos aqui
// type ButtonTypes = "submit" | "button" | "reset" | undefined;

const props = defineProps({
  type: {
    type: String,
    default: "submit",
  },
  color: {
    type: String,
    default: "primary",
  },
  link: {
    type: String,
    default: "",
  },
});
</script>
