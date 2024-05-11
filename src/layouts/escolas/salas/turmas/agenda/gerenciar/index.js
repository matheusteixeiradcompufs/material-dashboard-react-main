import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import Transfer from "./components/Transfer";
import { parseISO, getDay } from "date-fns";
import MDButton from "components/MDButton";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para gerenciar as disciplinas da agenda escolar de uma turma.
 * @module escolas/salas/turmas/agenda/gerenciar
 * @returns {JSX.Element} O componente para gerenciar disciplinas da agenda.
 */
function EscolaSalaTurmaAgendaGerenciarDisciplinas() {
  const { refreshToken } = useContext(AuthContext);
  const { escolaid, salaid, turmaid } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [turma, setTurma] = useState(null);
  const [segLeft, setSegLeft] = useState([]);
  const [segRight, setSegRight] = useState([]);
  const [terLeft, setTerLeft] = useState([]);
  const [terRight, setTerRight] = useState([]);
  const [quaLeft, setQuaLeft] = useState([]);
  const [quaRight, setQuaRight] = useState([]);
  const [quiLeft, setQuiLeft] = useState([]);
  const [quiRight, setQuiRight] = useState([]);
  const [sexLeft, setSexLeft] = useState([]);
  const [sexRight, setSexRight] = useState([]);

  /**
   * Função para obter as disciplinas de cada dia da semana.
   * @param {Array} dias - Array de objetos contendo informações dos dias da semana.
   * @returns {Object} Objeto contendo arrays de disciplinas para cada dia da semana.
   */
  function obterDisciplinas(dias) {
    let dom = [],
      seg = [],
      ter = [],
      qua = [],
      qui = [],
      sex = [],
      sab = [];
    dias.forEach((objeto) => {
      const dia_semana = getDay(parseISO(objeto.data));
      switch (dia_semana) {
        case 0:
          dom = objeto.objetos_disciplinas;
          break;
        case 1:
          seg = objeto.objetos_disciplinas;
          break;
        case 2:
          ter = objeto.objetos_disciplinas;
          break;
        case 3:
          qua = objeto.objetos_disciplinas;
          break;
        case 4:
          qui = objeto.objetos_disciplinas;
          break;
        case 5:
          sex = objeto.objetos_disciplinas;
          break;
        case 6:
          sab = objeto.objetos_disciplinas;
          break;
        default:
          break;
      }
    });
    return { dom, seg, ter, qua, qui, sex, sab };
  }

  useEffect(() => {
    const fetchTurma = async () => {
      try {
        const response = await api.get(`/escolas/sala/turma/api/v1/${turmaid}/`);
        const { objetos_disciplinas, objeto_agenda } = response.data;
        const { seg, ter, qua, qui, sex } = obterDisciplinas(
          objeto_agenda.objetos_dias.slice(0, 7)
        );
        setTurma(response.data);
        setSegLeft(
          objetos_disciplinas.filter(
            (item) => !seg.some((element) => element.id === item.id && element.nome === item.nome)
          )
        );
        setSegRight(seg);
        setTerLeft(
          objetos_disciplinas.filter(
            (item) => !ter.some((element) => element.id === item.id && element.nome === item.nome)
          )
        );
        setTerRight(ter);
        setQuaLeft(
          objetos_disciplinas.filter(
            (item) => !qua.some((element) => element.id === item.id && element.nome === item.nome)
          )
        );
        setQuaRight(qua);
        setQuiLeft(
          objetos_disciplinas.filter(
            (item) => !qui.some((element) => element.id === item.id && element.nome === item.nome)
          )
        );
        setQuiRight(qui);
        setSexLeft(
          objetos_disciplinas.filter(
            (item) => !sex.some((element) => element.id === item.id && element.nome === item.nome)
          )
        );
        setSexRight(sex);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchTurma();
        } else {
          toast.error("Erro ao carregar turma!");
          console.log("Erro ao carregar turma!", error);
        }
        setLoading(false);
      }
    };
    fetchTurma();
  }, []);

  /**
   * Função para lidar com o salvamento das disciplinas na agenda.
   */
  const handleSalvar = async () => {
    setLoading(true);
    try {
      await api.post("/pessoas/agendasdisciplinas/", {
        agenda_id: turma.objeto_agenda.id,
        seg: segRight.map((item) => item.id),
        ter: terRight.map((item) => item.id),
        qua: quaRight.map((item) => item.id),
        qui: quiRight.map((item) => item.id),
        sex: sexRight.map((item) => item.id),
      });
      navigate(`/escola/${escolaid}/sala/${salaid}/turma/${turmaid}/agenda`);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleSalvar();
      } else {
        toast.error("Erro ao preencher a agenda com as disciplinas!");
        console.log("Erro ao preencher a agenda com as disciplinas!", error);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Audio
            height="80"
            width="80"
            radius="9"
            color="#3089ec"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ToastContainer />
      <DashboardNavbar />
      <MDBox pt={6} mb={3}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Disciplinas dos dias
            </MDTypography>
          </MDBox>
          <Transfer
            day={"Segunda-feira"}
            left={segLeft}
            right={segRight}
            setLeft={setSegLeft}
            setRight={setSegRight}
          />
          <Transfer
            day={"Terça-feira"}
            left={terLeft}
            right={terRight}
            setLeft={setTerLeft}
            setRight={setTerRight}
          />
          <Transfer
            day={"Quarta-feira"}
            left={quaLeft}
            right={quaRight}
            setLeft={setQuaLeft}
            setRight={setQuaRight}
          />
          <Transfer
            day={"Quinta-feira"}
            left={quiLeft}
            right={quiRight}
            setLeft={setQuiLeft}
            setRight={setQuiRight}
          />
          <Transfer
            day={"Sexta-feira"}
            left={sexLeft}
            right={sexRight}
            setLeft={setSexLeft}
            setRight={setSexRight}
          />
          <MDBox mx={2} py={3} px={2} display="flex" justifyContent="center">
            <MDBox mr={1}>
              <MDButton variant="gradient" color="success" onClick={handleSalvar}>
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton
                variant="gradient"
                color="error"
                onClick={() =>
                  navigate(`/escola/${escolaid}/sala/${salaid}/turma/${turmaid}/agenda`)
                }
              >
                Cancelar
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default EscolaSalaTurmaAgendaGerenciarDisciplinas;
