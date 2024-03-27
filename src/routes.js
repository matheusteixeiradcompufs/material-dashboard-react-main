import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Profile from "layouts/profile";

import Icon from "@mui/material/Icon";
// import { Frequencia, FrequenciaAluno } from "layouts/frequencia";
import { Notas, NotasAluno } from "layouts/notas";
import Escolas from "layouts/escolas";
import Disciplinas from "layouts/disciplina";
import Logout from "layouts/authentication/logout";
import ProfessorAgenda from "layouts/professoragenda";
import Itens from "layouts/itens";
import Alunos from "layouts/pessoas/alunos";
import Funcionarios from "layouts/pessoas/funcionarios";
import EscolaTelefones from "layouts/escolas/telefones";
import EscolaEmails from "layouts/escolas/emails";
import EscolaSalas from "layouts/escolas/salas";
import EscolaMurais from "layouts/escolas/murais";
import EscolaCardapios from "layouts/escolas/cardapios";
import CardapioItens from "layouts/escolas/cardapios/itens";
import MuralAvisos from "layouts/escolas/murais/avisos";
import SalaTurmas from "layouts/escolas/salas/turmas";
import TurmaAlunos from "layouts/escolas/salas/turmas/alunos";
import TurmaDisciplinas from "layouts/escolas/salas/turmas/disciplinas";
import TurmaAgenda from "layouts/escolas/salas/turmas/agenda";
import GerenciarDisciplinas from "layouts/escolas/salas/turmas/agenda/gerenciar";
import DiaAgenda from "layouts/escolas/salas/turmas/agenda/diaagenda";
import AlunoTelefones from "layouts/pessoas/alunos/telefones";
import AlunoEmails from "layouts/pessoas/alunos/emails";
import AlunoResponsaveis from "layouts/pessoas/alunos/responsaveis";
import AlunoBoletins from "layouts/pessoas/alunos/boletins";
import BoletimFrequencia from "layouts/pessoas/alunos/boletins/frequencia";
import BoletimNotas from "layouts/pessoas/alunos/boletins/notas";
import BoletimRecados from "layouts/pessoas/alunos/boletins/recados";

const routes = [
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
  //ESCOLAS
  {
    type: "collapse",
    name: "Gestão de Escolas",
    key: "escolas",
    icon: <Icon fontSize="small">house</Icon>,
    route: "/escolas",
    component: <Escolas />,
  },
  {
    type: "item",
    name: "Telefones da Escola",
    key: "escolatelefones",
    route: "/escolas/:escolaid/telefones",
    component: <EscolaTelefones />,
  },
  {
    type: "item",
    name: "Emails da Escola",
    key: "escolaemails",
    route: "/escolas/:escolaid/emails",
    component: <EscolaEmails />,
  },
  {
    type: "item",
    name: "Salas da Escola",
    key: "escolasalas",
    route: "/escolas/:escolaid/salas",
    component: <EscolaSalas />,
  },
  {
    type: "item",
    name: "Salas da Escola",
    key: "escolasalas",
    route: "/escolas/:escolaid/salas/:salaid/turmas",
    component: <SalaTurmas />,
  },
  {
    type: "item",
    name: "Salas da Escola",
    key: "escolasalas",
    route: "/escolas/:escolaid/salas/:salaid/turmas/:turmaid/alunos",
    component: <TurmaAlunos />,
  },
  {
    type: "item",
    name: "Salas da Escola",
    key: "escolasalas",
    route: "/escolas/:escolaid/salas/:salaid/turmas/:turmaid/disciplinas",
    component: <TurmaDisciplinas />,
  },
  {
    type: "item",
    name: "Salas da Escola",
    key: "escolasalas",
    route: "/escolas/:escolaid/salas/:salaid/turmas/:turmaid/agenda",
    component: <TurmaAgenda />,
  },
  {
    type: "item",
    name: "Salas da Escola",
    key: "escolasalas",
    route: "/escolas/:escolaid/salas/:salaid/turmas/:turmaid/agenda/gerenciar",
    component: <GerenciarDisciplinas />,
  },
  {
    type: "item",
    name: "Salas da Escola",
    key: "escolasalas",
    route: "/escolas/:escolaid/salas/:salaid/turmas/:turmaid/agenda/diaagenda",
    component: <DiaAgenda />,
  },
  {
    type: "item",
    name: "Murais da Escola",
    key: "escolamurais",
    route: "/escolas/:escolaid/murais",
    component: <EscolaMurais />,
  },
  {
    type: "item",
    name: "Murais da Escola",
    key: "escolamurais",
    route: "/escolas/:escolaid/murais/:muralid/avisos",
    component: <MuralAvisos />,
  },
  {
    type: "item",
    name: "Cardápios da Escola",
    key: "escolacardapios",
    route: "/escolas/:escolaid/cardapios",
    component: <EscolaCardapios />,
  },
  {
    type: "item",
    name: "Cardápios do Dia",
    key: "escolacardapioitens",
    route: "/escolas/:escolaid/cardapios/:cardapioid/itens",
    component: <CardapioItens />,
  },
  //ESCOLAS
  //------------------------
  //PESSOAS
  {
    type: "collapse",
    name: "Gestão de Pessoas",
    key: "pessoas",
    icon: <Icon fontSize="small">person</Icon>,
    collapse: [
      {
        type: "collapse",
        name: "Alunos",
        key: "pessoas_alunos",
        route: "/pessoas/alunos",
        component: <Alunos />,
      },
      {
        type: "collapse",
        name: "Funcionários",
        key: "pessoas_funcionarios",
        route: "/pessoas/funcionarios",
        component: <Funcionarios />,
      },
    ],
  },
  {
    type: "item",
    name: "Telefones do Aluno",
    key: "telefones_aluno",
    route: "/pessoas/alunos/:alunoid/telefones",
    component: <AlunoTelefones />,
  },
  {
    type: "item",
    name: "Telefones do Aluno",
    key: "telefones_aluno",
    route: "/pessoas/alunos/:alunoid/emails",
    component: <AlunoEmails />,
  },
  {
    type: "item",
    name: "Telefones do Aluno",
    key: "telefones_aluno",
    route: "/pessoas/alunos/:alunoid/responsaveis",
    component: <AlunoResponsaveis />,
  },
  {
    type: "item",
    name: "Telefones do Aluno",
    key: "telefones_aluno",
    route: "/pessoas/alunos/:alunoid/matriculas",
    component: <AlunoBoletins />,
  },
  {
    type: "item",
    name: "Frequência do Aluno",
    key: "frequencia_aluno",
    route: "/pessoas/alunos/:alunoid/matriculas/:boletimid/frequencia",
    component: <BoletimFrequencia />,
  },
  {
    type: "item",
    name: "Boletim do Aluno",
    key: "boletim_aluno",
    route: "/pessoas/alunos/:alunoid/matriculas/:boletimid/Notas",
    component: <BoletimNotas />,
  },
  {
    type: "item",
    name: "Agenda de Recados do Aluno",
    key: "boletim_recados",
    route: "/pessoas/alunos/:alunoid/matriculas/:boletimid/Recados",
    component: <BoletimRecados />,
  },
  //PESSOAS
  //------------------------
  //DISCIPLINAS
  {
    type: "collapse",
    name: "Disciplinas",
    key: "disciplinas",
    icon: <Icon fontSize="small">menu_book</Icon>,
    route: "/disciplinas",
    component: <Disciplinas />,
  },
  //DISCIPLINAS
  //------------------------
  //ITENS DA MERENDA
  {
    type: "collapse",
    name: "Ítens da Merenda",
    key: "itensmerenda",
    icon: <Icon fontSize="small">restaurant</Icon>,
    route: "/itensmerenda",
    component: <Itens />,
  },
  //ITENS DA MERENDA
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
  //REFATORANDO
  // {
  //   type: "item",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "item",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    type: "collapse",
    name: "Professor",
    key: "professor",
    icon: <Icon fontSize="small">school</Icon>,
    collapse: [
      // {
      //   type: "collapse",
      //   name: "Frequência",
      //   key: "professor_frequencia",
      //   route: "/professor/frequencia",
      //   component: <Frequencia />,
      // },
      {
        type: "collapse",
        name: "Notas",
        key: "professor_notas",
        route: "/professor/notas",
        component: <Notas />,
      },
      {
        type: "collapse",
        name: "Agenda Escolar",
        key: "professor_agendaescolar",
        route: "/professor/agendaescolar",
        component: <ProfessorAgenda />,
      },
    ],
  },
  // {
  //   type: "item",
  //   name: "Aluno",
  //   key: "frequencia_aluno",
  //   route: "/frequencia/aluno/:id", // Rota dinâmica com parâmetro ':id'
  //   component: <FrequenciaAluno />, // Escondendo esta rota para que não apareça no menu principal
  // },
  {
    type: "item",
    name: "Notas do Aluno",
    key: "notas_aluno",
    route: "/notas/aluno/:id", // Rota dinâmica com parâmetro ':id'
    component: <NotasAluno />, // Escondendo esta rota para que não apareça no menu principal
  },
];

export default routes;
