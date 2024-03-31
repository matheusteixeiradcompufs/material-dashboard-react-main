import { Card, Fab, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import { ToastContainer, toast } from "react-toastify";
import Aluno from "./components/Aluno";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "services/apiClient";
import { Audio } from "react-loader-spinner";
import ManageIcon from "@mui/icons-material/Settings";

function TransporteAlunos() {
  const { transporteid } = useParams();
  const [loading, setLoading] = useState(true);
  const [transporte, setTransporte] = useState(null);
  useEffect(() => {
    const fetchTransporte = async () => {
      try {
        const response = await api.get(`/pessoas/transporte/api/v1/${transporteid}/`);
        setTransporte(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar dados do transporte!");
        console.log("Erro ao carregar dados do transporte!", error);
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
                              <MDButton
                                variant="gradient"
                                color="info"
                                size="small"
                                // onClick={() => handleOnViewAluno(aluno.id)}
                              >
                                Visualizar
                              </MDButton>
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
                color="success"
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