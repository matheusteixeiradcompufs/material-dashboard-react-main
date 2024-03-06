import Login from "layouts/authentication/login";

import Icon from "@mui/material/Icon";

const authroutes = [
  {
    type: "collapse",
    name: "Login",
    key: "login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/",
    component: <Login />,
  },
];

export default authroutes;
