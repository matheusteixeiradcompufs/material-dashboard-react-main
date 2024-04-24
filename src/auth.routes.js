import Login from "layouts/authentication/login";
import ResetPassword from "layouts/authentication/reset-password/cover";
import ResetPasswordConfirm from "layouts/authentication/reset-password-confirm/cover";

import Icon from "@mui/material/Icon";
import QRCodeReaderPage from "layouts/leitorqr";
import Logout from "layouts/authentication/logout";

const authroutes = [
  {
    type: "collapse",
    name: "Login",
    key: "login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/",
    component: <Login />,
  },
  {
    type: "collapse",
    name: "Reset",
    key: "reset_password",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/reset-password",
    component: <ResetPassword />,
  },
  {
    type: "collapse",
    name: "Reset Confirm",
    key: "reset_password_confirm",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/reset-password-confirm/:pid/:puid/:ptoken/",
    component: <ResetPasswordConfirm />,
  },
  //------------------------
  //QRCODE
  {
    type: "item",
    name: "Leitor QR",
    key: "leitorqr",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/leitorqr",
    component: <QRCodeReaderPage />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/logout",
    component: <Logout />,
  },
];

export default authroutes;
