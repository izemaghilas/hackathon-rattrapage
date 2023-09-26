import { ROLES } from "../../constants";
import Icons from "../../icons/sidebar";

const index = (role: string) => {
  const common = [
    {
      title: "Evénements",
      Icon: Icons.EventIcon,
      path: "/dashboard/user-list",
    },
    {
      title: "Formations",
      Icon: Icons.TrainingIcon,
      path: "/dashboard/training-list",
    },
  ]

  if(role === ROLES.admin) {
    return [
      {
        title: "Consultants",
        Icon: Icons.UserManagementIcon,
        path: "/dashboard/user-list",
      }, 
      ...common
    ]
  }

  return common
}

export default index;
