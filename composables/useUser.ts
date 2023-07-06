type User = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export const useUser = () => {
  const users = ref<Array<User> | null>(null);
  const user = ref<User | null>(null);

  async function fetchUsers() {
    try {
      const response = await myApiFetch<Array<User>>("/users", {
        method: "GET",
      });

      console.log("RESPONSE: ", response);
    } catch (error: any) {
      console.log("ERROR: ", error);
    }
  }

  async function show() {}

  async function store() {}

  async function destory() {}

  return {
    users,
    user,
    fetchUsers,
    show,
    store,
    destory,
  };
};
