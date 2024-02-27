// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import Login from "layouts/authentication/login";

// @mui icons
import Icon from "@mui/material/Icon";
import { Frequencia, FrequenciaAluno } from "layouts/frequencia";
import { Notas, NotasAluno } from "layouts/notas";
import { AgendaEscolar } from "layouts/agendaescolar";
import Escolas from "layouts/escolas";
import EscolaEdit from "layouts/escolaedit";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Login",
    key: "login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/login",
    component: <Login />,
  },
  {
    type: "collapse",
    name: "Escolas",
    key: "escolas",
    icon: <Icon fontSize="small">house</Icon>,
    route: "/escola",
    component: <Escolas />,
  },
  {
    type: "item",
    name: "Escola",
    key: "escolaedit",
    route: "/escola/:id",
    component: <EscolaEdit />,
  },
  {
    type: "collapse",
    name: "Frequência",
    key: "frequencia",
    icon: <Icon fontSize="small">pending_actions</Icon>,
    route: "/frequencia",
    component: <Frequencia />,
  },
  {
    type: "item",
    name: "Aluno",
    key: "frequencia_aluno",
    route: "/frequencia/aluno/:id", // Rota dinâmica com parâmetro ':id'
    component: <FrequenciaAluno />, // Escondendo esta rota para que não apareça no menu principal
  },
  {
    type: "collapse",
    name: "Notas",
    key: "notas",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/notas",
    component: <Notas />,
  },
  {
    type: "item",
    name: "Notas do Aluno",
    key: "notas_aluno",
    route: "/notas/aluno/:id", // Rota dinâmica com parâmetro ':id'
    component: <NotasAluno />, // Escondendo esta rota para que não apareça no menu principal
  },
  {
    type: "collapse",
    name: "Agenda Escolar",
    key: "agendaescolar",
    icon: <Icon fontSize="small">pending_actions</Icon>,
    route: "/agendaescolar",
    component: <AgendaEscolar />,
  },
];

export default routes;
