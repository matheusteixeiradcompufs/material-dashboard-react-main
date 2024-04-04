import { Card, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "context/AuthContext";

function Disciplinas() {
  const navigate = useNavigate();
  const { refreshToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/escolas/disciplina/api/v1/`);
        setDisciplinas(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchDisciplinas();
        } else {
          toast.error("Erro ao carregar disciplina!");
          console.log("Erro ao carregar disciplina!", error);
        }
        setLoading(false);
      }
    };
    fetchDisciplinas();
  }, []);

  const handleOnEditar = (disciplinaid) => {
    setLoading(true);
    navigate(`/disciplinas/${disciplinaid}/editar`);
  };

  const handleExcluir = async (disciplinaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/disciplina/api/v1/${disciplinaid}/`);
      const response = await api.get("/escolas/disciplina/api/v1/");
      setDisciplinas(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleExcluir(disciplinaid);
      } else {
        toast.error("Erro ao excluir disciplina!");
        console.log("Erro ao excluir disciplina!", error);
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
  const columns = [
    { Header: "nome", accessor: "nome", width: "80%", align: "left" },
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
                  Disciplinas
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns,
                    rows: disciplinas
                      ? disciplinas.map((disciplina, index) => ({
                          nome: disciplina.nome,
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
                                  color="warning"
                                  size="small"
                                  onClick={() => handleOnEditar(disciplina.id)}
                                >
                                  Editar
                                </MDButton>
                              </Grid>
                              <Grid item xs={12} sm={6} container>
                                <MDButton
                                  variant="gradient"
                                  color="error"
                                  size="small"
                                  onClick={() => handleExcluir(disciplina.id)}
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
            <Link to="/disciplinas/add">
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

export default Disciplinas;
