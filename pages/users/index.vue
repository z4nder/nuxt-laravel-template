<template>
  <NuxtLayout :name="layout">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p class="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <router-link to="/users/create">
            <button
              type="button"
              class="block rounded-md bg-secondary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </router-link>
        </div>
      </div>
      <v-table @onChangePage="changePage" :pagination="pagination">
        <template #thead>
          <tr>
            <v-th> ID </v-th>
            <v-th> Name </v-th>
            <v-th> Email </v-th>
            <v-th> Roles </v-th>
            <v-th>
              <span class="sr-only">Edit</span>
            </v-th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="user in users" :key="user.id">
            <v-td>
              {{ user.id }}
            </v-td>
            <v-td>
              {{ user.name }}
            </v-td>
            <v-td>
              {{ user.email }}
            </v-td>
            <v-td>
              <span
                v-for="role in user.roles"
                :key="role.id"
                class="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20"
              >
                {{ role.name }}</span
              >
            </v-td>
            <v-td>
              <div class="flex gap-2">
                <router-link
                  :to="`/users/${user.id}`"
                  class="bg-secondary-500 hover:bg-secondary-700 p-2 rounded-md"
                >
                  <PencilIcon class="h-5 w-5 text-white" aria-hidden="true" />
                </router-link>
                <a
                  href="#"
                  class="bg-red-500 hover:bg-red-700 p-2 rounded-md"
                  @click="openDelete(user)"
                >
                  <TrashIcon
                    class="h-5 w-5 text-white bg-text-500 hover:bg-text-700"
                    aria-hidden="true"
                /></a>
              </div>
            </v-td>
          </tr>
        </template>
      </v-table>
    </div>
    <v-modal
      title="Remove user"
      :open="showDeleteConfirm"
      @onClose="showDeleteConfirm = false"
    >
      <user-delete
        :user="selectedUser"
        @onDelete="onDeleteUser"
        @onCancel="showDeleteConfirm = false"
      />
    </v-modal>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { TrashIcon, PencilIcon } from "@heroicons/vue/24/outline";

definePageMeta({ middleware: ["auth"] });

const layout = "auth";
const { fetchUsers, users, pagination } = useUser();

const showDeleteConfirm = ref(false);
const selectedUser = ref();

onMounted(async () => {
  await fetchUsers();
});

const openDelete = (user) => {
  selectedUser.value = user;
  showDeleteConfirm.value = true;
};

const onDeleteUser = async () => {
  await fetchUsers();
  showDeleteConfirm.value = false;
};

const changePage = async (page: number) => {
  if (page > pagination.value.lastPage || page < pagination.value.firstPage) {
    return;
  }
  await fetchUsers(page);
};
</script>
