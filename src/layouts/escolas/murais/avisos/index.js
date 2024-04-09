import { Card, Fab, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { format } from "date-fns";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

function EscolaMuralAvisos() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid, muralid } = useParams();
  const [loading, setLoading] = useState(true);
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        let response = await api.get(`/escolas/mural/api/v1/${muralid}/`);
        setAvisos(response.data.objetos_avisos);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchAvisos();
        } else {
          toast.error("Erro ao carregar avisos!");
          console.log("Erro ao carregar avisos!", error);
        }
        setLoading(false);
      }
    };
    fetchAvisos();
  }, []);

  const handleView = (avisoid) => {
    setLoading(true);
    navigate(`/escola/${escolaid}/mural/${muralid}/aviso/${avisoid}/view`);
  };

  const handleExcluir = async (avisoid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/mural/aviso/api/v1/${avisoid}/`);
      const response = await api.get(`/escolas/mural/api/v1/${muralid}/`);
      setAvisos(response.data.objetos_avisos);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleExcluir(avisoid);
      } else {
        toast.error("Erro ao excluir aviso!");
        console.log("Erro ao excluir aviso!", error);
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
                  Avisos do Mural
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "data", accessor: "data", width: "30%", align: "left" },
                      { Header: "titulo", accessor: "titulo", width: "40%", align: "left" },
                      { Header: "", accessor: "opcoes", align: "center" },
                    ],
                    rows: [
                      ...avisos
                        .sort((a, b) => new Date(b.publicado_em) - new Date(a.publicado_em))
                        .map((objeto) => ({
                          data: format(
                            new Date(objeto.publicado_em),
                            "dd/MM/yyyy 'às' HH:mm 'horas'"
                          ),
                          titulo: objeto.titulo,
                          opcoes: (
                            <MDBox display="flex" flexDirection="row">
                              <MDBox mr={1}>
                                <MDButton
                                  variant="gradient"
                                  color="info"
                                  size="small"
                                  onClick={() => handleView(objeto.id)}
                                >
                                  Visualizar
                                </MDButton>
                              </MDBox>
                              <MDBox ml={1}>
                                <MDButton
                                  variant="gradient"
                                  color="error"
                                  size="small"
                                  onClick={() => handleExcluir(objeto.id)}
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
            <Link to={`/escola/${escolaid}/mural/${muralid}/avisos/add`}>
              <Fab
                color="success"
                aria-label="Add"
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

export default EscolaMuralAvisos;
