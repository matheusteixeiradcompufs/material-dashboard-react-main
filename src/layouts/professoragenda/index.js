import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { AuthContext } from "context/AuthContext";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";

function ProfessorAgenda() {
  const [loading, setLoading] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchTurmas = async () => {
      setLoading(true);
      try {
        const { username } = user;
        const response = await api.post("/pessoas/me/", { username });
        const { objetos_turmas } = await response.data;
        setTurmas(objetos_turmas);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar turmas");
        console.error("Erro ao carregar turmas:", error);
        setLoading(false);
      }
    };
    fetchTurmas();
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
  const columns = [
    { Header: "turma", accessor: "turma", width: "80%", align: "left" },
    { Header: "opções", accessor: "opcoes", align: "center" },
  ];
  return (
    <DashboardLayout>
      <ToastContainer />
      <MDBox pt={6} mb={3}>
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
                  Selecione uma turma
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows: turmas?.map((turma) => ({
                      turma: turma.nome,
                      opcoes: (
                        <Link to={`/turma/${turma.id}/agenda`}>
                          <MDButton variant="gradient" color="info">
                            Visualizar
                          </MDButton>
                        </Link>
                      ),
                    })),
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ProfessorAgenda;
