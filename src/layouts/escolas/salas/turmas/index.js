import { Card, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

function EscolaSalaTurmas() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid, salaid } = useParams();
  const [loading, setLoading] = useState(true);
  const [sala, setSala] = useState(null);

  useEffect(() => {
    const fetchSala = async () => {
      try {
        const response = await api.get(`/escolas/sala/api/v1/${salaid}/`);
        setSala(response.data);
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

  const handleView = (turmaid) => {
    setLoading(true);
    navigate(`/escola/${escolaid}/sala/${salaid}/turma/${turmaid}/view`);
  };

  const handleExcluir = async (turmaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/sala/turma/api/v1/${turmaid}`);
      const response = await api.get(`/escolas/sala/api/v1/${salaid}`);
      setSala(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleExcluir(turmaid);
      } else {
        toast.error("Erro ao excluir a turma!");
        console.log("Erro ao excluir a turma!", error);
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
                  Turmas da Sala {String(sala.numero).padStart(3, "0")}
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "nome", accessor: "nome", align: "left" },
                      { Header: "ano", accessor: "ano", align: "left" },
                      { Header: "opcoes", accessor: "opcoes", align: "center" },
                    ],
                    rows: sala.objetos_turmas
                      ? sala.objetos_turmas.map((turma) => ({
                          nome: turma.nome,
                          ano: turma.ano,
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
                                  onClick={() => handleView(turma.id)}
                                >
                                  Visualizar
                                </MDButton>
                              </Grid>
                              <Grid item xs={12} sm={6} container>
                                <MDButton
                                  variant="gradient"
                                  color="error"
                                  size="small"
                                  onClick={() => handleExcluir(turma.id)}
                                >
                                  Excluir
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
          <Grid item xs={12} mt={6}>
            <Link to={`/escola/${escolaid}/sala/${salaid}/turmas/add`}>
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

export default EscolaSalaTurmas;
