import { useToast } from "vue-toast-notification";
type Role = {
  id: number;
  created_at: string;
  guard_name: string;
  name: string;
  updated_at: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  roles: Array<Role>;
};

type Pagination = {
  page: number;
  firstPage: number;
  lastPage: number;
  to: number;
  total: number;
};

type Paginate<T> = {
  current_page: number;
  data: Array<T>;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  path: string;
  links: Array<Object>;
  first_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page_url: string | null;
};

type UserDto = {
  name: string;
  email: string;
  roles: Array<number>;
  password: string;
  password_confirmation: string;
};

export const useUser = () => {
  const router = useRouter();
  const users = ref<Array<User> | null>(null);
  const user = ref<User | null>(null);
  const errors = ref({});
  const toast = useToast({
    position: "top-right",
  });

  const pagination = ref<Pagination>({
    page: 1,
    firstPage: 1,
    lastPage: 1,
    to: 1,
    total: 1,
  });
  const form = reactive<UserDto>({
    name: "",
    email: "",
    roles: [],
    password: "",
    password_confirmation: "",
  });

  async function fetchUsers(page = 1) {
    try {
      const response = await myApiFetch<Paginate<User>>(`/users?page=${page}`, {
        method: "GET",
      });
      users.value = response.data;
      pagination.value = {
        page: response.current_page,
        firstPage: 1,
        lastPage: response.last_page,
        to: response.to,
        total: response.total,
      };
    } catch (error: any) {
      console.log("ERROR: ", error);
    }
  }

  async function show(id: number) {
    try {
      const response = await myApiFetch<User>(`/users/${id}`, {
        method: "GET",
      });
      user.value = response;
      setForm(response);
    } catch (error: any) {
      if (error.response?.status === 422) {
        errors.value = errorFormat(error.response._data.errors);
      } else if (error.response.status === 401) {
        errors.value = { general: error.response._data.message };
      }
    }
  }

  async function store(payload: UserDto) {
    try {
      await myApiFetch("/users", {
        method: "POST",
        body: payload,
      });
      await router.push("/users");
      toast.success("Created with success");
    } catch (error: any) {
      if (error.response?.status === 422) {
        errors.value = errorFormat(error.response._data.errors);
      } else if (error.response.status === 401) {
        errors.value = { general: error.response._data.message };
      }
    }
  }

  async function update(payload: UserDto) {
    try {
      await myApiFetch(`/users/${user.value.id}`, {
        method: "PUT",
        body: payload,
      });
      toast.success("Updated with success");
      await router.push("/users");
    } catch (error: any) {
      if (error.response?.status === 422) {
        errors.value = errorFormat(error.response._data.errors);
      } else if (error.response.status === 401) {
        errors.value = { general: error.response._data.message };
      }
    }
  }

  async function destory(id) {
    try {
      await myApiFetch(`/users/${id}`, {
        method: "DELETE",
      });
      toast.success("Deleted with success");
    } catch (error: any) {
      console.log("ERROR: ", error);
    }
  }

  function setForm(user: User) {
    form.name = user.name;
    form.email = user.email;
    const roleIds: Array<number> = user.roles.map((role) => role.id);
    form.roles = roleIds;
  }

  return {
    pagination,
    errors,
    form,
    users,
    user,
    fetchUsers,
    show,
    store,
    destory,
    update,
  };
};
