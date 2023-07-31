<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-40 md:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 flex z-40">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-50"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div
                  class="flex-shrink-0 flex items-center px-4 border-b-2 border-gray-200 mx-4"
                >
                  <div>
                    <v-logo />
                  </div>
                  <h2 class="text-xl font-bold tracking-tight text-primary-800">
                    Hive Community
                  </h2>
                </div>
                <nav class="mt-5 px-2 space-y-1">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    :class="{
                      'bg-gray-100 text-black hover:bg-gray-200 border border-primary-200':
                        isRouteActive(item.href),
                    }"
                    class="bg-gray-50 text-black hover:bg-gray-100 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  >
                    <component
                      :is="item.icon"
                      :class="'text-primary-500 group-hover:text-primary-300 mr-3 flex-shrink-0 h-6 w-6'"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </router-link>
                </nav>
              </div>
              <div class="flex-shrink-0 flex bg-primary-900 p-4">
                <a href="#" class="flex-shrink-0 w-full group block">
                  <div class="flex flex-row justify-between">
                    <div class="flex flex-row justify-left">
                      <div>
                        <img
                          class="inline-block h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-white">
                          {{ userStore.user.name }}
                        </p>
                        <button
                          class="text-xs font-medium text-gray-300 group-hover:text-gray-200"
                        >
                          View profile
                        </button>
                      </div>
                    </div>
                    <div
                      class="flex flex-row justify-center items-center"
                      @click="logout"
                    >
                      <XCircleIcon
                        class="h-8 w-8 text-gray-50"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="flex-shrink-0 w-14"></div>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div class="flex-1 flex flex-col min-h-0 bg-gray-50">
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div
            class="flex items-center flex-shrink-0 px-4 border-b-2 border-gray-200 mx-4"
          >
            <div>
              <v-logo />
            </div>
            <h2 class="text-md font-bold tracking-tight text-primary-800">
              Hive Community
            </h2>
          </div>
          <nav class="mt-5 flex-1 px-2 space-y-1">
            <router-link
              v-for="item in permissions.filterNavigation(
                navigation,
                userStore.user.permissions
              )"
              :key="item.name"
              :to="item.href"
              :class="{
                'bg-gray-100 text-black hover:bg-gray-200 border border-primary-200':
                  isRouteActive(item.href),
              }"
              class="bg-gray-50 text-black hover:bg-gray-100 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <component
                :is="item.icon"
                :class="'text-primary-500 group-hover:text-primary-300 mr-3 flex-shrink-0 h-6 w-6'"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </nav>
        </div>
        <div class="flex-shrink-0 flex bg-primary-900 p-4">
          <a href="#" class="flex-shrink-0 w-full group block">
            <div class="flex flex-row justify-between">
              <div class="flex flex-row justify-left">
                <img
                  class="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div class="ml-3">
                  <p class="text-sm font-medium text-white">
                    {{ userStore.user.name }}
                  </p>
                  <button
                    class="text-xs font-medium text-gray-300 group-hover:text-gray-200"
                  >
                    View profile
                  </button>
                </div>
              </div>

              <div
                class="flex flex-row justify-center items-center"
                @click="logout"
              >
                <XCircleIcon class="h-8 w-8 text-gray-50" aria-hidden="true" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="md:pl-64 flex flex-col flex-1">
      <div
        class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-primary-900"
      >
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars4Icon class="h-6 w-6 text-gray-100" aria-hidden="true" />
        </button>
      </div>
      <main class="bg-gray-100 h-screen min-h-full">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1> -->
          </div>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ChartPieIcon,
  WalletIcon,
  Bars4Icon,
  XMarkIcon,
  XCircleIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";

import { useUserStore } from "~/store/useUserStore";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: ChartPieIcon,
    permissions: [],
  },
  {
    name: "Users",
    href: "/users",
    icon: UserCircleIcon,
    permissions: ["users-list"],
  },
  {
    name: "Spend",
    href: "/spends",
    icon: WalletIcon,
    permissions: ["spends-list"],
  },
  {
    name: "Tag",
    href: "/tags",
    icon: ChartPieIcon,
    permissions: ["tags-list"],
  },
];
const sidebarOpen = ref(false);
const { logout } = useAuth();
const userStore = useUserStore();
const router = useRouter();

const isRouteActive = (route) =>
  router.currentRoute.value.path === route ||
  router.currentRoute.value.path.startsWith(route + "/");
</script>
