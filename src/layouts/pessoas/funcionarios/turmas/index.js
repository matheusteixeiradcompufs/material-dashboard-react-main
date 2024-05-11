import { Card, Fab, Grid } from "@mui/material";
import ManageIcon from "@mui/icons-material/Settings";
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

/**
 * Componente FuncionarioTurmas para exibir as turmas associadas a um funcionário.
 * @module pessoas/funcionarios/turmas
 * @returns {JSX.Element} Componente FuncionarioTurmas.
 */
function FuncionarioTurmas() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { funcionarioid } = useParams();
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Função para buscar os dados das turmas associadas ao funcionário.
     */
    const fetchDados = async () => {
      try {
        const response = await api.get(`/pessoas/funcionario/api/v1/${funcionarioid}/`);
        setTurmas(response.data.objetos_turmas);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchDados();
        } else {
          toast.error("Erro ao carregar dados");
          console.error("Erro ao carregar dados:", error);
        }
        setLoading(false);
      }
    };
    fetchDados();
  }, []);

  /**
   * Função para obter o nome do turno com base na sigla.
   * @param {string} turno - A sigla do turno.
   * @returns {string} O nome do turno.
   */
  const getTurno = (turno) => {
    let response;
    switch (turno) {
      case "M":
        response = "Manhã";
        break;
      case "T":
        response = "Tarde";
        break;
      case "N":
        response = "Noite";
        break;
      default:
        response = "";
        break;
    }
    return response;
  };

  /**
   * Função para lidar com o evento de visualização de uma turma.
   * @param {string} turmaid - O ID da turma.
   */
  const handleView = (turmaid) => {
    setLoading(true);
    navigate(`/pessoas/funcionario/${funcionarioid}/turma/${turmaid}/view`);
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
                  Turmas
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "nome", accessor: "nome", align: "left" },
                      { Header: "ano", accessor: "ano", align: "center" },
                      { Header: "turno", accessor: "turno", align: "center" },
                      { Header: "", accessor: "opcoes", align: "right" },
                    ],
                    rows: turmas
                      ? turmas.map((turma) => ({
                          nome: turma.nome,
                          ano: turma.ano,
                          turno: getTurno(turma.turno),
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
                                  onClick={() => handleView(turma.id)}
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
          <Grid item xs={12} mt={6}>
            <Link to={`/pessoas/funcionario/${funcionarioid}/turmas/manage`}>
              <Fab
                color="info"
                aria-label="add"
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

export default FuncionarioTurmas;
