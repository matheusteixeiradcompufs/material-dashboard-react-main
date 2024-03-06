import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Profile from "layouts/profile";

import Icon from "@mui/material/Icon";
import { Frequencia, FrequenciaAluno } from "layouts/frequencia";
import { Notas, NotasAluno } from "layouts/notas";
import { AgendaEscolar } from "layouts/agendaescolar";
import Escolas from "layouts/escolas";
import EscolaEdit from "layouts/escolaedit";
import TurmasSala from "layouts/turmassala";
import TurmaDetail from "layouts/turmadetail";
import Disciplinas from "layouts/disciplina";
import Logout from "layouts/authentication/logout";
import TurmaDisciplinas from "layouts/turmadisciplinas";
import ProfessorAgenda from "layouts/professoragenda";
import TurmaAgenda from "layouts/turmaagenda";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/",
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
    name: "Turmas da Sala",
    key: "turmas_sala",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/turmas/:id",
    component: <TurmasSala />,
  },
  {
    type: "item",
    name: "Turma",
    key: "turma",
    route: "/turma/:id", // Rota dinâmica com parâmetro ':id'
    component: <TurmaDetail />, // Escondendo esta rota para que não apareça no menu principal
  },
  {
    type: "item",
    name: "Disciplinas da Turma",
    key: "turma_disciplinas",
    route: "/turma/:id/disciplinas", // Rota dinâmica com parâmetro ':id'
    component: <TurmaDisciplinas />, // Escondendo esta rota para que não apareça no menu principal
  },
  {
    type: "item",
    name: "Agenda da Turma",
    key: "turma_agenda",
    route: "/turma/:id/agenda", // Rota dinâmica com parâmetro ':id'
    component: <TurmaAgenda />, // Escondendo esta rota para que não apareça no menu principal
  },
  {
    type: "collapse",
    name: "Professor Agenda Escolar",
    key: "professor_agendaescolar",
    icon: <Icon fontSize="small">pending_actions</Icon>,
    route: "/professor/agendaescolar",
    component: <ProfessorAgenda />,
  },
  {
    type: "collapse",
    name: "Disciplinas",
    key: "disciplinas",
    icon: <Icon fontSize="small">pending_actions</Icon>,
    route: "/disciplinas",
    component: <Disciplinas />,
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

export default routes;
