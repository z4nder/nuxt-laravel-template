<template>
  <div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div
          class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <slot name="thead"></slot>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <slot name="tbody"></slot>
            </tbody>
          </table>
          <div
            class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
          >
            <div class="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                @click="emit('onChangePage', pagination.page - 1)"
                >Previous</a
              >
              <a
                href="#"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                @click="emit('onChangePage', pagination.page + 1)"
                >Next</a
              >
            </div>
            <div
              class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"
            >
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  {{ " " }}
                  <span class="font-medium">{{ pagination.page }}</span>
                  {{ " " }}
                  to
                  {{ " " }}
                  <span class="font-medium">{{ pagination.to }}</span>
                  {{ " " }}
                  of
                  {{ " " }}
                  <span class="font-medium">{{ pagination.total }}</span>
                  {{ " " }}
                  results
                </p>
              </div>
              <div>
                <nav
                  class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    @click="emit('onChangePage', pagination.page - 1)"
                  >
                    <span class="sr-only">Previous</span>
                    <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                  </a>

                  <a
                    v-for="page in range(pagination.lastPage, 1)"
                    :key="page"
                    :class="{
                      'cursor-pointer relative z-10 inline-flex items-center bg-primary-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600':
                        page == pagination.page,
                      'cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-00': true,
                    }"
                    @click="emit('onChangePage', page)"
                    >{{ page }}</a
                  >
                  <a
                    href="#"
                    class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    @click="emit('onChangePage', pagination.page + 1)"
                  >
                    <span class="sr-only">Next</span>
                    <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

type Pagination = {
  page: number;
  firstPage: number;
  lastPage: number;
  to: number;
  total: number;
};
export interface Props {
  pagination?: Pagination;
}

withDefaults(defineProps<Props>(), {
  pagination: () => ({
    type: Object as PropType<Pagination>,
    required: true,
  }),
});
const emit = defineEmits(["onChangePage"]);
</script>
