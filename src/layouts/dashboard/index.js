/**
 * DASHBOARD. Esse é o layout que renderiza a página principal da aplicação.
 * É a página exibida a todos os usuários logo após o logon.
 * @file
 */
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "./components/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import GraficoTurmas from "layouts/dashboard/data/graficoTurmas";
import { useContext, useEffect, useState } from "react";
import { api } from "services/apiClient";
import { AuthContext } from "context/AuthContext";
import GraficoAlunos from "./data/graficoAlunos";
import GraficoEscolas from "./data/graficoEscolas";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

/**
 * Componente principal para a página do dashboard.
 * @module dashboard
 * @returns {JSX.Element} O componente do dashboard.
 */
function Dashboard() {
  // Hooks de estado e contexto
  const { graficoTurmas } = GraficoTurmas();
  const { graficoAlunos } = GraficoAlunos();
  const { graficoEscolas } = GraficoEscolas();
  const { refreshToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [escolas, setEscolas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const data = new Date();

  // Efeito colateral para carregar dados
  useEffect(() => {
    /**
     * Função assíncrona para buscar dados do servidor.
     * @returns {Promise<void>}
     */
    const fetchDados = async () => {
      try {
        let response = await api.get("/escolas/api/v1/");
        setEscolas(response.data);
        response = await api.get("/pessoas/aluno/api/v1/");
        setAlunos(response.data);
        response = await api.get("/pessoas/funcionario/api/v1/");
        setFuncionarios(response.data);
        response = await api.get("/escolas/sala/turma/api/v1/");
        setTurmas(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchDados();
        } else {
          toast.error("Erro ao carregar os dados!");
          console.log(error);
          setLoading(false);
        }
      }
    };
    fetchDados();
  }, []);

  // Se ainda estiver carregando, exibe um spinner de carregamento
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

  // Renderiza o dashboard
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ToastContainer />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Card de estatísticas para Escolas */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="house"
                title="Escolas"
                count={escolas.length}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "cadastradas",
                }}
              />
            </MDBox>
          </Grid>
          {/* Card de estatísticas para Alunos */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="face"
                title="Alunos"
                count={
                  alunos.filter((aluno) =>
                    aluno.objetos_boletins.some(
                      (boletim) => boletim.objeto_turma.ano === data.getFullYear()
                    )
                  ).length
                }
                percentage={{
                  color: "success",
                  amount: "",
                  label: `matriculados em ${data.getFullYear()}`,
                }}
              />
            </MDBox>
          </Grid>
          {/* Card de estatísticas para Funcionários */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="work"
                title="Funcionários"
                count={funcionarios.length}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Prof., Coord. e Dir.",
                }}
              />
            </MDBox>
          </Grid>
          {/* Card de estatísticas para Turmas */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="assignment_ind"
                title="Turmas"
                count={turmas.filter((objeto) => objeto.ano === 2024).length}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "em 2024",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* Gráficos */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {/* Gráfico de barras de Alunos */}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Alunos Matriculados"
                  description="Gráfico que exibe o número de alunos matriculados em cada ano"
                  date="dados atualizados"
                  chart={graficoAlunos}
                />
              </MDBox>
            </Grid>
            {/* Gráfico de linha de Turmas */}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="Turmas Abertas"
                  description="Gráfico que representa as turmas abertas em cada ano"
                  date="dados atualizados"
                  chart={graficoTurmas}
                />
              </MDBox>
            </Grid>
            {/* Gráfico de barras de Escolas */}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="dark"
                  title="Escolas Cadastradas"
                  description="Gráfico que representa as escolas cadastradas no sistema"
                  date="atualizado"
                  chart={graficoEscolas}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
