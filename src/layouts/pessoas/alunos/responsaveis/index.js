import { Card, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

function AlunoResponsaveis() {
  const navigate = useNavigate();
  const { alunoid } = useParams();
  const [responsaveis, setResponsaveis] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
        setResponsaveis(response.data.objetos_responsaveis);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar os responsáveis do aluno!");
        console.error("Erro ao carregar os responsáveis do aluno!", error);
        setLoading(false);
      }
    };
    fetchAluno();
  }, []);
  const handleView = (responsavelid) => {
    setLoading(true);
    navigate(`/pessoas/aluno/${alunoid}/responsavel/${responsavelid}/view`);
  };
  const handleExcluir = async (responsavelid) => {
    setLoading(true);
    try {
      await api.delete(`/pessoas/aluno/responsavel/api/v1/${responsavelid}/`);
      const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
      setAluno(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir responsável");
      console.log("Erro ao excluir responsável", error);
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
                  Responsáveis do Aluno
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "cpf", accessor: "cpf", align: "left" },
                      { Header: "nome", accessor: "nome", align: "left" },
                      { Header: "opcoes", accessor: "opcoes", align: "right" },
                    ],
                    rows: responsaveis.map((responsavel) => ({
                      cpf: responsavel.cpf,
                      nome: responsavel.nome,
                      opcoes: (
                        <Grid
                          container
                          spacing={2}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Grid item xs={12} sm={6} container>
                            <MDButton
                              variant="gradient"
                              color="info"
                              size="small"
                              onClick={() => handleView(responsavel.id)}
                            >
                              Visualizar
                            </MDButton>
                          </Grid>
                          <Grid item xs={12} sm={6} container>
                            <MDButton
                              variant="gradient"
                              color="error"
                              size="small"
                              onClick={() => handleExcluir(responsavel.id)}
                            >
                              Excluir
                            </MDButton>
                          </Grid>
                        </Grid>
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
          <Grid item xs={12} mt={6}>
            <Link to={`/pessoas/aluno/${alunoid}/responsaveis/add`}>
              <Fab
                color="success"
                aria-label="add"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
              >
                <AddIcon color="white" />
              </Fab>
            </Link>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AlunoResponsaveis;
