import Login from "layouts/authentication/login";

import Icon from "@mui/material/Icon";
import Professor from "layouts/professor";
import Perfil from "layouts/perfil";
import ProfessorTurmas from "layouts/professor/turmas";
import ViewProfessorTurma from "layouts/professor/turmas/view";
import Logout from "layouts/authentication/logout";
import Dashboard from "layouts/dashboard";
import EscolaSalaTurmaAgenda from "layouts/escolas/salas/turmas/agenda";
import EscolaSalaTurmaAgendaGerenciarDisciplinas from "layouts/escolas/salas/turmas/agenda/gerenciar";
import EscolaSalaTurmaAgendaDiaAgenda from "layouts/escolas/salas/turmas/agenda/diaagenda";
import QRCodeReaderPage from "layouts/leitorqr";

const professorroutes = [
  //DASHBOARD
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/",
    component: <Dashboard />,
  },
  //DASHBOARD
  //------------------------
  //PERFIL
  {
    type: "item",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/perfil",
    component: <Perfil />,
  },
  //PERFIL
  //------------------------
  //PROFESSOR
  {
    type: "collapse",
    name: "Professor",
    key: "professor",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/professor",
    component: <Professor />,
  },
  {
    type: "item",
    name: "ProfessorTurmas",
    key: "professor_turmas",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/professor/turmas",
    component: <ProfessorTurmas />,
  },
  {
    type: "item",
    name: "ViewProfessorTurma",
    key: "view_professor_turma",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/professor/turma/:turmaid/view",
    component: <ViewProfessorTurma />,
  },
  {
    type: "item",
    name: "Salas da Escola",
    key: "escolasalas",
    route: "/escola/:escolaid/sala/:salaid/turma/:turmaid/agenda",
    component: <EscolaSalaTurmaAgenda />,
  },
  {
    type: "item",
    name: "Salas da Escola",
    key: "escolasalas",
    route: "/escola/:escolaid/sala/:salaid/turma/:turmaid/agenda/gerenciar",
    component: <EscolaSalaTurmaAgendaGerenciarDisciplinas />,
  },
  {
    type: "item",
    name: "Salas da Escola",
    key: "escolasalas",
    route: "/escola/:escolaid/sala/:salaid/turma/:turmaid/agenda/diaagenda",
    component: <EscolaSalaTurmaAgendaDiaAgenda />,
  },
  //PROFESSOR
  //------------------------
  //LOGOUT
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/logout",
    component: <Logout />,
  },
  //LOGOUT
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
];

export default professorroutes;
