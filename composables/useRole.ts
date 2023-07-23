type Role = {
  id: number;
  created_at: string;
  guard_name: string;
  name: string;
  updated_at: string;
};

export const useRole = () => {
  const roles = ref<Array<Role> | null>(null);

  async function fetchRoles() {
    try {
      const response = await myApiFetch<Array<Role>>(`/roles`, {
        method: "GET",
      });
      roles.value = response;
    } catch (error: any) {}
  }

  return {
    roles,
    fetchRoles,
  };
};
