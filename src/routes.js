import Dashboard from "layouts/dashboard";
import Perfil from "layouts/perfil";

import Icon from "@mui/material/Icon";
import Disciplinas from "layouts/disciplina";
import AddDisciplinas from "layouts/disciplina/add";
import EditarDisciplina from "layouts/disciplina/editar";
import Itens from "layouts/itens";
import Alunos from "layouts/pessoas/alunos";
import AlunoTelefones from "layouts/pessoas/alunos/telefones";
import AlunoEmails from "layouts/pessoas/alunos/emails";
import AlunoResponsaveis from "layouts/pessoas/alunos/responsaveis";
import AlunoBoletins from "layouts/pessoas/alunos/boletins";
import BoletimFrequencia from "layouts/pessoas/alunos/boletins/frequencia";
import BoletimNotas from "layouts/pessoas/alunos/boletins/notas";
import BoletimRecados from "layouts/pessoas/alunos/boletins/recados";
import Funcionarios from "layouts/pessoas/funcionarios";
import Escolas from "layouts/escolas";
import EscolaTelefones from "layouts/escolas/telefones";
import EscolaEmails from "layouts/escolas/emails";
import EscolaSalas from "layouts/escolas/salas";
import EscolaMurais from "layouts/escolas/murais";
import EscolaCardapios from "layouts/escolas/cardapios";
import TurmaAlunos from "layouts/escolas/salas/turmas/alunos";
import Transportes from "layouts/transportes";
import AddTransportes from "layouts/transportes/add";
import ViewTransportes from "layouts/transportes/view";
import EditarTransportes from "layouts/transportes/editar";
import TransporteTelefones from "layouts/transportes/telefones";
import AddTransporteTelefone from "layouts/transportes/telefones/add";
import ViewTransporteTelefone from "layouts/transportes/telefones/view";
import EditarTransporteTelefone from "layouts/transportes/telefones/editar";
import TransporteAlunos from "layouts/transportes/alunos";
import GerenciarTransporteAlunos from "layouts/transportes/alunos/gerenciar";
import Logout from "layouts/authentication/logout";
import AddEscolas from "layouts/escolas/add";
import ViewEscola from "layouts/escolas/view";
import EditarEscola from "layouts/escolas/editar";
import AddEscolaTelefones from "layouts/escolas/telefones/add";
import ViewEscolaTelefone from "layouts/escolas/telefones/view";
import EditarEscolaTelefone from "layouts/escolas/telefones/editar";
import AddEscolaEmails from "layouts/escolas/emails/add";
import ViewEscolaEmail from "layouts/escolas/emails/view";
import EditarEscolaEmail from "layouts/escolas/emails/editar";
import AddEscolaMurais from "layouts/escolas/murais/add";
import ViewEscolaMural from "layouts/escolas/murais/view";
import EditarEscolaMural from "layouts/escolas/murais/editar";
import EscolaMuralAvisos from "layouts/escolas/murais/avisos";
import AddEscolaMuralAvisos from "layouts/escolas/murais/avisos/add";
import ViewEscolaMuralAviso from "layouts/escolas/murais/avisos/view";
import EditarEscolaMuralAviso from "layouts/escolas/murais/avisos/editar";
import AddEscolaCardapios from "layouts/escolas/cardapios/add";
import ViewEscolaCardapio from "layouts/escolas/cardapios/view";
import EditarEscolaCardapio from "layouts/escolas/cardapios/editar";
import EscolaCardapioItens from "layouts/escolas/cardapios/itens";
import ViewEscolaCardapioItem from "layouts/escolas/cardapios/itens/view";
import ManageEscolaCardapioItens from "layouts/escolas/cardapios/itens/manage";
import AddEscolaSalas from "layouts/escolas/salas/add";
import ViewEscolaSala from "layouts/escolas/salas/view";
import EditarEscolaSala from "layouts/escolas/salas/editar";
import EscolaSalaTurmas from "layouts/escolas/salas/turmas";
import AddEscolaSalaTurmas from "layouts/escolas/salas/turmas/add";
import ViewEscolaSalaTurma from "layouts/escolas/salas/turmas/view";
import EditarEscolaSalaTurma from "layouts/escolas/salas/turmas/editar";
import EscolaSalaTurmaDisciplinas from "layouts/escolas/salas/turmas/disciplinas";
import ManageEscolaSalaTurmaDisciplinas from "layouts/escolas/salas/turmas/disciplinas/manage";
import EscolaSalaTurmaAgenda from "layouts/escolas/salas/turmas/agenda";
import EscolaSalaTurmaAgendaDiaAgenda from "layouts/escolas/salas/turmas/agenda/diaagenda";
import EscolaSalaTurmaAgendaGerenciarDisciplinas from "layouts/escolas/salas/turmas/agenda/gerenciar";
import AddItens from "layouts/itens/add";
import ViewItem from "layouts/itens/view";
import EditarItem from "layouts/itens/editar";
import AddFuncionarios from "layouts/pessoas/funcionarios/add";
import ViewFuncionario from "layouts/pessoas/funcionarios/view";
import EditarFuncionario from "layouts/pessoas/funcionarios/editar";
import AddAlunos from "layouts/pessoas/alunos/add";
import ViewAluno from "layouts/pessoas/alunos/view";
import EditarAluno from "layouts/pessoas/alunos/editar";
import AddAlunoTelefones from "layouts/pessoas/alunos/telefones/add";
import ViewAlunoTelefone from "layouts/pessoas/alunos/telefones/view";
import EditarAlunoTelefone from "layouts/pessoas/alunos/telefones/editar";
import AddAlunoEmails from "layouts/pessoas/alunos/emails/add";
import ViewAlunoEmail from "layouts/pessoas/alunos/emails/view";
import EditarAlunoEmail from "layouts/pessoas/alunos/emails/editar";
import AddAlunoResponsaveis from "layouts/pessoas/alunos/responsaveis/add";
import ViewAlunoResponsavel from "layouts/pessoas/alunos/responsaveis/view";
import EditarAlunoResponsavel from "layouts/pessoas/alunos/responsaveis/editar";
import AddAlunoBoletins from "layouts/pessoas/alunos/boletins/add";
import ViewAlunoBoletim from "layouts/pessoas/alunos/boletins/view";
import EditarAlunoBoletim from "layouts/pessoas/alunos/boletins/editar";
import AddDiasLetivosBoletimFrequencia from "layouts/pessoas/alunos/boletins/frequencia/add";
import EditDiaLetivoBoletimFrequencia from "layouts/pessoas/alunos/boletins/frequencia/editar";
import FuncionarioTurmas from "layouts/pessoas/funcionarios/turmas";
import ManageFuncionarioTurmas from "layouts/pessoas/funcionarios/turmas/manage";
import ViewFuncionarioTurma from "layouts/pessoas/funcionarios/turmas/view";
import Professor from "layouts/professor";
import ProfessorTurmas from "layouts/professor/turmas";
import ViewProfessorTurma from "layouts/professor/turmas/view";
import ViewTurmaAluno from "layouts/escolas/salas/turmas/alunos/view";
import QRCodeReaderPage from "layouts/leitorqr";

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
    name: "Add Escolas",
    key: "add_escolas",
    icon: <Icon fontSize="small">house</Icon>,
    route: "/escolas/add",
    component: <AddEscolas />,
  },
  {
    type: "item",
    name: "View Escola",
    key: "view_escola",
    icon: <Icon fontSize="small">house</Icon>,
    route: "/escola/:escolaid/view",
    component: <ViewEscola />,
  },
  {
    type: "item",
    name: "Editar Escola",
    key: "editar_escola",
    icon: <Icon fontSize="small">house</Icon>,
    route: "/escola/:escolaid/editar",
    component: <EditarEscola />,
  },
  {
    type: "item",
    name: "Telefones da Escola",
    key: "escolatelefones",
    route: "/escola/:escolaid/telefones",
    component: <EscolaTelefones />,
  },
  {
    type: "item",
    name: "Add Telefones da Escola",
    key: "addescolatelefones",
    route: "/escola/:escolaid/telefones/add",
    component: <AddEscolaTelefones />,
  },
  {
    type: "item",
    name: "Visualizar Telefone da Escola",
    key: "viewescolatelefone",
    route: "/escola/:escolaid/telefone/:telefoneid/view",
    component: <ViewEscolaTelefone />,
  },
  {
    type: "item",
    name: "Modificar Telefone da Escola",
    key: "editarescolatelefone",
    route: "/escola/:escolaid/telefone/:telefoneid/editar",
    component: <EditarEscolaTelefone />,
  },
  {
    type: "item",
    name: "Emails da Escola",
    key: "escolaemails",
    route: "/escola/:escolaid/emails",
    component: <EscolaEmails />,
  },
  {
    type: "item",
    name: "Add Emails da Escola",
    key: "addescolaemails",
    route: "/escola/:escolaid/emails/add",
    component: <AddEscolaEmails />,
  },
  {
    type: "item",
    name: "View Email da Escola",
    key: "viewescolaemail",
    route: "/escola/:escolaid/email/:emailid/view",
    component: <ViewEscolaEmail />,
  },
  {
    type: "item",
    name: "Editar Email da Escola",
    key: "editarescolaemail",
    route: "/escola/:escolaid/email/:emailid/editar",
    component: <EditarEscolaEmail />,
  },
  {
    type: "item",
    name: "Salas da Escola",
    key: "escolasalas",
    route: "/escola/:escolaid/salas",
    component: <EscolaSalas />,
  },
  {
    type: "item",
    name: "Add Salas da Escola",
    key: "addescolasalas",
    route: "/escola/:escolaid/salas/add",
    component: <AddEscolaSalas />,
  },
  {
    type: "item",
    name: "View Sala da Escola",
    key: "viewescolasala",
    route: "/escola/:escolaid/sala/:salaid/view",
    component: <ViewEscolaSala />,
  },
  {
    type: "item",
    name: "Editar Sala da Escola",
    key: "editarescolasala",
    route: "/escola/:escolaid/sala/:salaid/editar",
    component: <EditarEscolaSala />,
  },
  {
    type: "item",
    name: "Turmas da Sala da Escola",
    key: "escolasalaturmas",
    route: "/escola/:escolaid/sala/:salaid/turmas",
    component: <EscolaSalaTurmas />,
  },
  {
    type: "item",
    name: "Add Turmas da Sala da Escola",
    key: "addescolasalaturmas",
    route: "/escola/:escolaid/sala/:salaid/turmas/add",
    component: <AddEscolaSalaTurmas />,
  },
  {
    type: "item",
    name: "View Turma da Sala da Escola",
    key: "viewescolasalaturma",
    route: "/escola/:escolaid/sala/:salaid/turma/:turmaid/view",
    component: <ViewEscolaSalaTurma />,
  },
  {
    type: "item",
    name: "Editar Turma da Sala da Escola",
    key: "editarescolasalaturma",
    route: "/escola/:escolaid/sala/:salaid/turma/:turmaid/editar",
    component: <EditarEscolaSalaTurma />,
  },
  {
    type: "item",
    name: "Alunos da Turma",
    key: "alunos_turma",
    route: "/escola/:escolaid/sala/:salaid/turma/:turmaid/alunos",
    component: <TurmaAlunos />,
  },
  {
    type: "item",
    name: "View Aluno da Turma",
    key: "view_aluno_turma",
    route: "/escola/:escolaid/sala/:salaid/turma/:turmaid/aluno/:alunoid/view",
    component: <ViewTurmaAluno />,
  },
  {
    type: "item",
    name: "Disciplinas da Turma da Sala da Escola",
    key: "escolasalaturmadisciplinas",
    route: "/escola/:escolaid/sala/:salaid/turma/:turmaid/disciplinas",
    component: <EscolaSalaTurmaDisciplinas />,
  },
  {
    type: "item",
    name: "Manage Disciplinas da Turma da Sala da Escola",
    key: "manageescolasalaturmadisciplinas",
    route: "/escola/:escolaid/sala/:salaid/turma/:turmaid/disciplinas/manage",
    component: <ManageEscolaSalaTurmaDisciplinas />,
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
  {
    type: "item",
    name: "Murais da Escola",
    key: "escolamurais",
    route: "/escola/:escolaid/murais",
    component: <EscolaMurais />,
  },
  {
    type: "item",
    name: "Add Murais da Escola",
    key: "addescolamurais",
    route: "/escola/:escolaid/murais/add",
    component: <AddEscolaMurais />,
  },
  {
    type: "item",
    name: "View Mural da Escola",
    key: "viewescolamural",
    route: "/escola/:escolaid/mural/:muralid/view",
    component: <ViewEscolaMural />,
  },
  {
    type: "item",
    name: "Editar Mural da Escola",
    key: "editarescolamural",
    route: "/escola/:escolaid/mural/:muralid/editar",
    component: <EditarEscolaMural />,
  },
  {
    type: "item",
    name: "Avisos do Mural da Escola",
    key: "escolamuralavisos",
    route: "/escola/:escolaid/mural/:muralid/avisos",
    component: <EscolaMuralAvisos />,
  },
  {
    type: "item",
    name: "Add Avisos do Mural da Escola",
    key: "addescolamuralavisos",
    route: "/escola/:escolaid/mural/:muralid/avisos/add",
    component: <AddEscolaMuralAvisos />,
  },
  {
    type: "item",
    name: "View Aviso do Mural da Escola",
    key: "viewescolamuralavisos",
    route: "/escola/:escolaid/mural/:muralid/aviso/:avisoid/view",
    component: <ViewEscolaMuralAviso />,
  },
  {
    type: "item",
    name: "Editar Aviso do Mural da Escola",
    key: "editarescolamuralavisos",
    route: "/escola/:escolaid/mural/:muralid/aviso/:avisoid/editar",
    component: <EditarEscolaMuralAviso />,
  },
  {
    type: "item",
    name: "Cardápios da Escola",
    key: "escolacardapios",
    route: "/escola/:escolaid/cardapios",
    component: <EscolaCardapios />,
  },
  {
    type: "item",
    name: "Add Cardápios da Escola",
    key: "addescolacardapios",
    route: "/escola/:escolaid/cardapios/add",
    component: <AddEscolaCardapios />,
  },
  {
    type: "item",
    name: "View Cardápio da Escola",
    key: "viewescolacardapio",
    route: "/escola/:escolaid/cardapio/:cardapioid/view",
    component: <ViewEscolaCardapio />,
  },
  {
    type: "item",
    name: "Editar Cardápio da Escola",
    key: "editarescolacardapio",
    route: "/escola/:escolaid/cardapio/:cardapioid/editar",
    component: <EditarEscolaCardapio />,
  },
  {
    type: "item",
    name: "Itens do Cardápio da Escola",
    key: "escolacardapioitens",
    route: "/escola/:escolaid/cardapio/:cardapioid/itens",
    component: <EscolaCardapioItens />,
  },
  {
    type: "item",
    name: "Cardápios do Dia",
    key: "escolacardapioitens",
    route: "/escola/:escolaid/cardapio/:cardapioid/itens/manage",
    component: <ManageEscolaCardapioItens />,
  },
  {
    type: "item",
    name: "Cardápios do Dia",
    key: "escolacardapioitens",
    route: "/escola/:escolaid/cardapio/:cardapioid/item/:itemid/view",
    component: <ViewEscolaCardapioItem />,
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
    name: "Add Funcionários",
    key: "addfuncionarios",
    route: "/pessoas/funcionarios/add",
    component: <AddFuncionarios />,
  },
  {
    type: "item",
    name: "View Funcionário",
    key: "viewfuncionario",
    route: "/pessoas/funcionario/:funcionarioid/view",
    component: <ViewFuncionario />,
  },
  {
    type: "item",
    name: "Editar Funcionário",
    key: "editarfuncionario",
    route: "/pessoas/funcionario/:funcionarioid/editar",
    component: <EditarFuncionario />,
  },
  {
    type: "item",
    name: "Turmas do Funcionário",
    key: "turmas_funcionario",
    route: "/pessoas/funcionario/:funcionarioid/turmas",
    component: <FuncionarioTurmas />,
  },
  {
    type: "item",
    name: "Gerenciar Turmas do Funcionário",
    key: "manage_turmas_funcionario",
    route: "/pessoas/funcionario/:funcionarioid/turmas/manage",
    component: <ManageFuncionarioTurmas />,
  },
  {
    type: "item",
    name: "Visualizar Turma do Funcionário",
    key: "view_turma_funcionario",
    route: "/pessoas/funcionario/:funcionarioid/turma/:turmaid/view",
    component: <ViewFuncionarioTurma />,
  },
  {
    type: "item",
    name: "Add Alunos",
    key: "addalunos",
    route: "/pessoas/alunos/add",
    component: <AddAlunos />,
  },
  {
    type: "item",
    name: "View Aluno",
    key: "viewaluno",
    route: "/pessoas/aluno/:alunoid/view",
    component: <ViewAluno />,
  },
  {
    type: "item",
    name: "Editar Aluno",
    key: "editaraluno",
    route: "/pessoas/aluno/:alunoid/editar",
    component: <EditarAluno />,
  },
  {
    type: "item",
    name: "Telefones do Aluno",
    key: "telefones_aluno",
    route: "/pessoas/aluno/:alunoid/telefones",
    component: <AlunoTelefones />,
  },
  {
    type: "item",
    name: "Telefones do Aluno",
    key: "telefones_aluno",
    route: "/pessoas/aluno/:alunoid/telefones/add",
    component: <AddAlunoTelefones />,
  },
  {
    type: "item",
    name: "Editar Telefone do Aluno",
    key: "editar_telefone_aluno",
    route: "/pessoas/aluno/:alunoid/telefone/:telefoneid/editar",
    component: <EditarAlunoTelefone />,
  },
  {
    type: "item",
    name: "View Telefone do Aluno",
    key: "view_telefone_aluno",
    route: "/pessoas/aluno/:alunoid/telefone/:telefoneid/view",
    component: <ViewAlunoTelefone />,
  },
  {
    type: "item",
    name: "Emails do Aluno",
    key: "emails_aluno",
    route: "/pessoas/aluno/:alunoid/emails",
    component: <AlunoEmails />,
  },
  {
    type: "item",
    name: "Add Emails do Aluno",
    key: "add_emails_aluno",
    route: "/pessoas/aluno/:alunoid/emails/add",
    component: <AddAlunoEmails />,
  },
  {
    type: "item",
    name: "View Email do Aluno",
    key: "view_email_aluno",
    route: "/pessoas/aluno/:alunoid/email/:emailid/view",
    component: <ViewAlunoEmail />,
  },
  {
    type: "item",
    name: "Editar Email do Aluno",
    key: "editar_email_aluno",
    route: "/pessoas/aluno/:alunoid/email/:emailid/editar",
    component: <EditarAlunoEmail />,
  },
  {
    type: "item",
    name: "Responsáveis do Aluno",
    key: "responsaveis_aluno",
    route: "/pessoas/aluno/:alunoid/responsaveis",
    component: <AlunoResponsaveis />,
  },
  {
    type: "item",
    name: "Add Responsáveis do Aluno",
    key: "add_responsaveis_aluno",
    route: "/pessoas/aluno/:alunoid/responsaveis/add",
    component: <AddAlunoResponsaveis />,
  },
  {
    type: "item",
    name: "View Responsável do Aluno",
    key: "view_responsavel_aluno",
    route: "/pessoas/aluno/:alunoid/responsavel/:responsavelid/view",
    component: <ViewAlunoResponsavel />,
  },
  {
    type: "item",
    name: "Editar Responsável do Aluno",
    key: "editar_responsavel_aluno",
    route: "/pessoas/aluno/:alunoid/responsavel/:responsavelid/editar",
    component: <EditarAlunoResponsavel />,
  },
  {
    type: "item",
    name: "Matrículas do Aluno",
    key: "matriculas_aluno",
    route: "/pessoas/aluno/:alunoid/boletins",
    component: <AlunoBoletins />,
  },
  {
    type: "item",
    name: "Add Matrículas do Aluno",
    key: "add_matriculas_aluno",
    route: "/pessoas/aluno/:alunoid/boletins/add",
    component: <AddAlunoBoletins />,
  },
  {
    type: "item",
    name: "View Matrícula do Aluno",
    key: "view_matricula_aluno",
    route: "/pessoas/aluno/:alunoid/boletim/:boletimid/view",
    component: <ViewAlunoBoletim />,
  },
  {
    type: "item",
    name: "Editar Matrícula do Aluno",
    key: "editar_matricula_aluno",
    route: "/pessoas/aluno/:alunoid/boletim/:boletimid/editar",
    component: <EditarAlunoBoletim />,
  },
  {
    type: "item",
    name: "Frequência do Aluno",
    key: "frequencia_aluno",
    route: "/pessoas/aluno/:alunoid/boletim/:boletimid/frequencia",
    component: <BoletimFrequencia />,
  },
  {
    type: "item",
    name: "Add Frequência do Aluno",
    key: "add_frequencia_aluno",
    route: "/pessoas/aluno/:alunoid/boletim/:boletimid/frequencia/diasletivos/add",
    component: <AddDiasLetivosBoletimFrequencia />,
  },
  {
    type: "item",
    name: "Editar DiaLetivo Frequência do Aluno",
    key: "editar_dialetivo_frequencia_aluno",
    route: "/pessoas/aluno/:alunoid/boletim/:boletimid/frequencia/dialetivo/:dialetivoid/edit",
    component: <EditDiaLetivoBoletimFrequencia />,
  },
  {
    type: "item",
    name: "Boletim do Aluno",
    key: "boletim_aluno",
    route: "/pessoas/aluno/:alunoid/boletim/:boletimid/notas",
    component: <BoletimNotas />,
  },
  {
    type: "item",
    name: "Agenda de Recados do Aluno",
    key: "boletim_recados",
    route: "/pessoas/aluno/:alunoid/boletim/:boletimid/recados",
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
  {
    type: "item",
    name: "Add Disciplinas",
    key: "add_disciplinas",
    icon: <Icon fontSize="small">menu_book</Icon>,
    route: "/disciplinas/add",
    component: <AddDisciplinas />,
  },
  {
    type: "item",
    name: "Editar Disciplinas",
    key: "editar_disciplinas",
    icon: <Icon fontSize="small">menu_book</Icon>,
    route: "/disciplinas/:disciplinaid/editar",
    component: <EditarDisciplina />,
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
  {
    type: "item",
    name: "Add Ítens da Merenda",
    key: "additensmerenda",
    icon: <Icon fontSize="small">restaurant</Icon>,
    route: "/itensmerenda/add",
    component: <AddItens />,
  },
  {
    type: "item",
    name: "View Ítem da Merenda",
    key: "Viewitensmerenda",
    icon: <Icon fontSize="small">restaurant</Icon>,
    route: "/itemmerenda/:itemid/view",
    component: <ViewItem />,
  },
  {
    type: "item",
    name: "Editar Ítem da Merenda",
    key: "Editaritensmerenda",
    icon: <Icon fontSize="small">restaurant</Icon>,
    route: "/itemmerenda/:itemid/editar",
    component: <EditarItem />,
  },
  //ITENS DA MERENDA
  //------------------------
  //TRANSPORTES
  {
    type: "collapse",
    name: "Transportes",
    key: "transportes",
    icon: <Icon fontSize="small">directions_bus</Icon>,
    route: "/transportes",
    component: <Transportes />,
  },
  {
    type: "item",
    name: "Add Transportes",
    key: "add_transportes",
    icon: <Icon fontSize="small">directions_bus</Icon>,
    route: "/transportes/add",
    component: <AddTransportes />,
  },
  {
    type: "item",
    name: "Visualizar Transportes",
    key: "view_transportes",
    icon: <Icon fontSize="small">directions_bus</Icon>,
    route: "/transportes/:transporteid/view",
    component: <ViewTransportes />,
  },
  {
    type: "item",
    name: "Editar Transportes",
    key: "editar_transportes",
    icon: <Icon fontSize="small">directions_bus</Icon>,
    route: "/transportes/:transporteid/editar",
    component: <EditarTransportes />,
  },
  //------------------------
  {
    type: "item",
    name: "Telefones do Transporte",
    key: "telefones_transporte",
    icon: <Icon fontSize="small">directions_bus</Icon>,
    route: "/transportes/:transporteid/telefones",
    component: <TransporteTelefones />,
  },
  {
    type: "item",
    name: "Adicionar Telefones do Transporte",
    key: "add_telefones_transporte",
    icon: <Icon fontSize="small">directions_bus</Icon>,
    route: "/transportes/:transporteid/telefones/add",
    component: <AddTransporteTelefone />,
  },
  {
    type: "item",
    name: "Visualizar Telefone do Transporte",
    key: "view_telefone_transporte",
    icon: <Icon fontSize="small">directions_bus</Icon>,
    route: "/transportes/:transporteid/telefone/:telefoneid/view",
    component: <ViewTransporteTelefone />,
  },
  {
    type: "item",
    name: "Modificar Telefone do Transporte",
    key: "editar_telefone_transporte",
    icon: <Icon fontSize="small">directions_bus</Icon>,
    route: "/transportes/:transporteid/telefone/:telefoneid/editar",
    component: <EditarTransporteTelefone />,
  },
  {
    type: "item",
    name: "Alunos do Transporte",
    key: "alunos_transporte",
    icon: <Icon fontSize="small">directions_bus</Icon>,
    route: "/transportes/:transporteid/alunos",
    component: <TransporteAlunos />,
  },
  {
    type: "item",
    name: "Gerenciar Alunos do Transporte",
    key: "gerenciar_alunos_transporte",
    icon: <Icon fontSize="small">directions_bus</Icon>,
    route: "/transportes/:transporteid/alunos/gerenciar",
    component: <GerenciarTransporteAlunos />,
  },
  //TRANSPORTES
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

export default routes;
