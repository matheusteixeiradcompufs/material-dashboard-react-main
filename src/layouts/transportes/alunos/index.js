import { Card, Fab, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import { ToastContainer, toast } from "react-toastify";
import Aluno from "./components/Aluno";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "services/apiClient";
import { Audio } from "react-loader-spinner";
import ManageIcon from "@mui/icons-material/Settings";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para exibir os alunos associados a um transporte.
 * @module transportes/alunos
 * @returns {JSX.Element} Componente de alunos do transporte.
 */
function TransporteAlunos() {
  const { refreshToken } = useContext(AuthContext);
  const { transporteid } = useParams();
  const [loading, setLoading] = useState(true);
  const [transporte, setTransporte] = useState(null);

  useEffect(() => {
    /**
     * Função assíncrona para buscar os dados do transporte e definir o estado de carregamento.
     */
    const fetchTransporte = async () => {
      try {
        const response = await api.get(`/pessoas/transporte/api/v1/${transporteid}/`);
        setTransporte(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchTransporte();
        } else {
          toast.error("Erro ao carregar dados do transporte!");
          console.log("Erro ao carregar dados do transporte!", error);
        }
        setLoading(false);
      }
    };
    fetchTransporte();
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
      <ToastContainer />
      <DashboardNavbar />
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
                  Alunos do Transporte
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "aluno", accessor: "aluno", width: "45%", align: "left" },
                      { Header: "matrícula", accessor: "matricula", align: "center" },
                      { Header: "usuário", accessor: "usuario", align: "center" },
                      { Header: "opções", accessor: "opcoes", align: "center" },
                    ],
                    rows: [
                      ...transporte?.objetos_alunos.map((aluno) => ({
                        aluno: (
                          <Aluno
                            image={aluno.retrato}
                            name={`${aluno.objeto_usuario.first_name} ${aluno.objeto_usuario.last_name}`}
                          />
                        ),
                        matricula: aluno.matricula,
                        usuario: aluno.objeto_usuario.username,
                        opcoes: (
                          <MDBox display="flex" flexDirection="row">
                            <MDBox>
                              <Link to={`/pessoas/aluno/${aluno.id}/view`}>
                                <MDButton variant="gradient" color="info" size="small">
                                  Visualizar
                                </MDButton>
                              </Link>
                            </MDBox>
                          </MDBox>
                        ),
                      })),
                    ],
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} mt={6}>
            <Link to={`/transportes/${transporteid}/alunos/gerenciar`}>
              <Fab
                color="info"
                aria-label="Gerenciar"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
              >
                <ManageIcon color="white" />
              </Fab>
            </Link>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default TransporteAlunos;
