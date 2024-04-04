import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { AuthContext } from "context/AuthContext";

function ProfessorTurmas() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { user, first_name } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [turmas, setTurmas] = useState(null);

  useEffect(() => {
    const fetchSala = async () => {
      try {
        let response = await api.post(`/pessoas/me/`, {
          username: user.username,
        });
        setTurmas(response.data.objetos_turmas);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchSala();
        } else {
          toast.error("Erro ao carregar turmas da sala!");
          console.log("Erro ao carregar turmas da sala", error);
        }
        setLoading(false);
      }
    };
    fetchSala();
  }, []);

  const handleView = (turma) => {
    setLoading(true);
    navigate(`/professor/turma/${turma.id}/view`);
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
                  Turmas do Professor {first_name}
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "nome", accessor: "nome", align: "left" },
                      { Header: "ano", accessor: "ano", align: "left" },
                      { Header: "escola", accessor: "escola", align: "left" },
                      { Header: "opcoes", accessor: "opcoes", align: "center" },
                    ],
                    rows: turmas
                      ? turmas.map((turma) => ({
                          nome: turma.nome,
                          ano: turma.ano,
                          escola: turma.objeto_sala.objeto_escola.nome,
                          opcoes: (
                            <Grid
                              container
                              spacing={2}
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Grid item xs={12}>
                                <MDButton
                                  variant="gradient"
                                  color="info"
                                  size="small"
                                  onClick={() => handleView(turma)}
                                >
                                  Visualizar
                                </MDButton>
                              </Grid>
                            </Grid>
                          ),
                        }))
                      : [],
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

export default ProfessorTurmas;
