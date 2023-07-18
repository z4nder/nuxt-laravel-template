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
  password_confirmation: string;
};

export const useUser = () => {
  const router = useRouter();
  const users = ref<Array<User> | null>(null);
  const user = ref<User | null>(null);
  const errors = ref({});
  const form = reactive<UserDto>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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
      await myApiFetch("/users", {
        method: "POST",
        body: payload,
      });
      await router.push("/users");
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
