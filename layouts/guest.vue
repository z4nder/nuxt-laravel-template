<template>
  <div
    class="bg-gradient-to-r from-primary-200 to-primary-300 h-screen min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div
      class="sm:mx-auto sm:w-full sm:max-w-md flex justify-center items-center"
    >
      <h2 class="text-3xl font-bold tracking-tight text-gray-50">
        Hive Community
      </h2>
      <div>
        <v-logo />
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <slot />
    </div>
  </div>
</template>
