/**
 * ALUNOS. Esse é o layout que renderiza a página que lista os alunos cadastrados.
 * A partir dela é possível também acessar as outras funções do CRUD dos alunos.
 * @file
 */
import { Card, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import { Link, useNavigate } from "react-router-dom";
import Aluno from "./components/Aluno";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para exibir uma lista de alunos.
 * @module pessoas/alunos
 * @returns {JSX.Element} JSX para a página de alunos.
 */
function Alunos() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState([]);

  /**
   * Função para carregar a lista de alunos.
   * @returns {Promise<void>}
   */
  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.get("/pessoas/aluno/api/v1/");
        setAlunos(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchAlunos();
        } else {
          toast.error("Erro ao carregar os alunos");
          console.log("Erro ao carregar os alunos", error);
        }
        setLoading(false);
      }
    };
    fetchAlunos();
  }, []);

  /**
   * Função para lidar com o clique no botão de visualizar aluno.
   * @param {number} alunoid - O ID do aluno.
   * @returns {void}
   */
  const handleOnViewAluno = (alunoid) => {
    setLoading(true);
    navigate(`/pessoas/aluno/${alunoid}/view`);
  };

  /**
   * Função para lidar com a exclusão de um aluno.
   * @param {number} alunoid - O ID do aluno.
   * @returns {Promise<void>}
   */
  const handleExcluir = async (alunoid) => {
    setLoading(true);
    try {
      let response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
      const { objeto_usuario } = response.data;
      await api.delete(`/pessoas/aluno/api/v1/${alunoid}/`);
      await api.delete(`/pessoas/usuario/api/v1/${objeto_usuario.id}/`);
      response = await api.get("/pessoas/aluno/api/v1/");
      setAlunos(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleExcluir(alunoid);
      } else {
        toast.error("Erro ao modificar aluno!");
        console.log("Erro ao modificar aluno!", error);
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
                  Alunos
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
                      ...alunos?.map((aluno) => ({
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
                            <MDBox mr={1}>
                              <MDButton
                                variant="gradient"
                                color="info"
                                size="small"
                                onClick={() => handleOnViewAluno(aluno.id)}
                              >
                                Visualizar
                              </MDButton>
                            </MDBox>
                            <MDBox ml={1}>
                              <MDButton
                                variant="gradient"
                                color="error"
                                size="small"
                                onClick={() => handleExcluir(aluno.id)}
                              >
                                Excluir
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
            <Link to="/pessoas/alunos/add">
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

export default Alunos;
