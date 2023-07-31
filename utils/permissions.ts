import { Component } from "nuxt/schema";

type MenuItem = {
  name: string;
  href: string;
  icon: Component;
  permissions: Array<string>;
};

export default {
  checkPermission(permission: string, permissions: Array<string>): boolean {
    return permissions.includes(permission);
  },
  filterNavigation(
    items: Array<MenuItem>,
    permissions: Array<string>
  ): Array<MenuItem> {
    return items.filter((item) => {
      if (item.permissions.length === 0) {
        return true;
      }

      return item.permissions.some((permission) =>
        this.checkPermission(permission, permissions)
      );
    });
  },
};
