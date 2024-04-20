import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "./components/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import GraficoTurmas from "layouts/dashboard/data/graficoTurmas";

// Dashboard components
import { useContext, useEffect, useState } from "react";
import { api } from "services/apiClient";
import { AuthContext } from "context/AuthContext";
import GraficoAlunos from "./data/graficoAlunos";
import GraficoEscolas from "./data/graficoEscolas";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

function Dashboard() {
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

  useEffect(() => {
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
      <DashboardNavbar />
      <ToastContainer />
      <MDBox py={3}>
        <Grid container spacing={3}>
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
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
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
