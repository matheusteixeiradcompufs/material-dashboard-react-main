import { Card, Grid, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Menu from "./components/Menu";
import DataTable from "examples/Tables/DataTable";
import MDAvatar from "components/MDAvatar";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente para visualizar detalhes de uma turma específica do professor.
 * @module professor/turmas
 * @returns {JSX.Element} Componente para visualização de detalhes da turma.
 */
function ViewProfessorTurma() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { turmaid } = useParams();
  const [loading, setLoading] = useState(true);
  const [turma, setTurma] = useState(null);

  useEffect(() => {
    /**
     * Função assíncrona para buscar os detalhes da turma.
     */
    const fetchTurma = async () => {
      try {
        const response = await api.get(`/escolas/sala/turma/api/v1/${turmaid}/`);
        setTurma(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchTurma();
        } else {
          toast.error("Erro ao carregar os dados da turma!");
          console.log("Erro ao carregar os dados da turma!", error);
        }
        setLoading(false);
      }
    };
    fetchTurma();
  }, []);

  /**
   * Função para navegar para a página de visualização do aluno.
   * @param {string} alunoid - ID do aluno.
   */
  const handleView = (alunoid) => {
    setLoading(true);
    navigate(
      `/escola/${turma.objeto_sala.escola}/sala/${turma.objeto_sala.id}/turma/${turma.id}/aluno/${alunoid}/view`
    );
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
                  Visualizar Turma
                </MDTypography>
              </MDBox>
              <Grid container spacing={1} mb={2}>
                <Grid item xs={12}>
                  <MDBox pt={3}>
                    <DataTable
                      table={{
                        columns: [
                          { Header: "aluno", accessor: "aluno", width: "45%", align: "left" },
                          { Header: "matrícula", accessor: "matricula", align: "center" },
                          { Header: "situação", accessor: "situacao", align: "center" },
                          { Header: "opções", accessor: "opcoes", align: "center" },
                        ],
                        rows:
                          turma?.objetos_boletins.map((boletim) => ({
                            aluno: (
                              <MDBox display="flex" alignItems="center" lineHeight={1}>
                                <MDAvatar
                                  src={boletim.objeto_aluno.retrato}
                                  name={boletim.objeto_aluno.objeto_usuario.first_name}
                                  size="sm"
                                />
                                <MDBox ml={2} lineHeight={1}>
                                  <MDTypography
                                    display="block"
                                    variant="button"
                                    fontWeight="medium"
                                  >
                                    {boletim.objeto_aluno.objeto_usuario.first_name}{" "}
                                    {boletim.objeto_aluno.objeto_usuario.last_name}
                                  </MDTypography>
                                </MDBox>
                              </MDBox>
                            ),
                            matricula: boletim.objeto_aluno.matricula,
                            situacao: boletim.status,
                            opcoes: (
                              <MDButton
                                variant="gradient"
                                color="info"
                                size="small"
                                onClick={() => handleView(boletim.objeto_aluno.id)}
                              >
                                Visualizar
                              </MDButton>
                            ),
                          })) || [],
                      }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={2} mb={3}>
        <Menu turma={turma} />
      </MDBox>
    </DashboardLayout>
  );
}

export default ViewProfessorTurma;
