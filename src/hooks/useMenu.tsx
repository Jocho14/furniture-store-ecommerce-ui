import UserRole from "@/enums/UserRole";
import * as employeeMenu from "@/config/menu/employee";
import * as clientMenu from "@/config/menu/client";

const useMenu = (userRole: UserRole) => {
  switch (userRole) {
    case UserRole.Client:
      return clientMenu;
    case UserRole.Employee:
      return employeeMenu;
    default:
      return {
        title: "",
        primaryGroup: [],
        secondaryGroup: [],
        footerGroup: [],
      };
  }
};

export default useMenu;
