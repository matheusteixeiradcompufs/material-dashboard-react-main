import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";
import { api } from "services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DiaSemana from "./components/DiaSemana";
import { useContext, useEffect, useState } from "react";
import { getDay, parseISO } from "date-fns";
import { useParams } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { AuthContext } from "context/AuthContext";

function EscolaSalaTurmaAgenda() {
  const { refreshToken } = useContext(AuthContext);
  const { escolaid, salaid, turmaid } = useParams();
  const [turma, setTurma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [segunda, setSegunda] = useState([]);
  const [terca, setTerca] = useState([]);
  const [quarta, setQuarta] = useState([]);
  const [quinta, setQuinta] = useState([]);
  const [sexta, setSexta] = useState([]);

  const obterDisciplinas = (dias) => {
    let dom = [],
      seg = [],
      ter = [],
      qua = [],
      qui = [],
      sex = [],
      sab = [];
    dias?.forEach((objeto) => {
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
  };

  useEffect(() => {
    const fetchTurma = async () => {
      try {
        const response = await api.get(`/escolas/sala/turma/api/v1/${turmaid}/`);
        setTurma(response.data);
        const { objeto_agenda } = response.data;
        if (objeto_agenda) {
          const { seg, ter, qua, qui, sex } = obterDisciplinas(
            objeto_agenda.objetos_dias.slice(0, 7)
          );
          setSegunda(seg);
          setTerca(ter);
          setQuarta(qua);
          setQuinta(qui);
          setSexta(sex);
        }
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchTurma();
        } else {
          toast.error("Erro ao carregar a turma");
          console.log("Erro ao carregar a turma", error);
        }
        setLoading(false);
      }
    };
    fetchTurma();
  }, []);

  const handleIniciarAgenda = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/sala/turma/agenda/api/v1/", {
        turma: turma.id,
      });
      const response = await api.get(`/escolas/sala/turma/api/v1/${turma.id}/`);
      setTurma(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleIniciarAgenda();
      } else {
        toast.error("Erro ao iniciar agenda da turma");
        console.log("Erro ao iniciar agenda da turma", error);
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
      <MDBox pt={2} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
                  Agenda Escolar do {turma?.nome}
                </MDTypography>
              </MDBox>
              {turma?.objeto_agenda ? (
                <MDBox mx={2} py={3} px={2} display="flex" justifyContent="center">
                  <Grid container spacing={2}>
                    <DiaSemana dia="Segunda" disciplinas={segunda} />
                    <DiaSemana dia="Terça" disciplinas={terca} />
                    <DiaSemana dia="Quarta" disciplinas={quarta} />
                    <DiaSemana dia="Quinta" disciplinas={quinta} />
                    <DiaSemana dia="Sexta" disciplinas={sexta} />
                    <Grid item xs={12}>
                      <MDBox display="flex" justifyContent="center">
                        <MDBox mr={1}>
                          <Link
                            to={`/escola/${escolaid}/sala/${salaid}/turma/${turmaid}/agenda/gerenciar`}
                          >
                            <MDButton variant="gradient" color="info">
                              Gerenciar Disciplinas
                            </MDButton>
                          </Link>
                        </MDBox>
                        <MDBox ml={1}>
                          <Link
                            to={`/escola/${escolaid}/sala/${salaid}/turma/${turmaid}/agenda/diaagenda`}
                          >
                            <MDButton variant="gradient" color="info">
                              Acessar Agenda
                            </MDButton>
                          </Link>
                        </MDBox>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              ) : (
                <MDBox mx={2} py={3} px={2} display="flex" justifyContent="center">
                  <MDButton variant="gradient" color="success" onClick={handleIniciarAgenda}>
                    Iniciar Agenda
                  </MDButton>
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default EscolaSalaTurmaAgenda;
