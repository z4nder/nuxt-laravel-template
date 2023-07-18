type User = {
  id: number;
  name: string;
  email: string;
  roles: Array<string>;
  created_at: string;
  updated_at: string;
};

type UserDto = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export const useUser = () => {
  const users = ref<Array<User> | null>(null);
  const user = ref<User | null>(null);
  const errors = ref({});
  const form = reactive<UserDto>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  async function fetchUsers() {
    try {
      const response = await myApiFetch<Array<User>>("/users", {
        method: "GET",
      });
      users.value = response;
    } catch (error: any) {
      console.log("ERROR: ", error);
    }
  }

  async function show() {}

  async function store(payload: UserDto) {
    try {
      const response = await myApiFetch("/users", {
        method: "POST",
        body: payload,
      });
      console.log("RESPONSE: ", response);
    } catch (error: any) {
      if (error.response?.status === 422) {
        errors.value = errorFormat(error.response._data.errors);
      } else if (error.response.status === 401) {
        errors.value = { general: error.response._data.message };
      }
    }
  }

  async function destory() {}

  return {
    errors,
    form,
    users,
    user,
    fetchUsers,
    show,
    store,
    destory,
  };
};
