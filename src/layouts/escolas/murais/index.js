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

function EscolaMurais() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid } = useParams();
  const [escola, setEscola] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEscola = async () => {
      try {
        const response = await api.get(`/escolas/api/v1/${escolaid}/`);
        setEscola(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchEscola();
        } else {
          toast.error("Erro ao carregar escola");
          console.error("Erro ao carregar escola:", error);
        }
        setLoading(false);
      }
    };
    fetchEscola();
  }, []);

  const handleView = (muralid) => {
    setLoading(true);
    navigate(`/escola/${escolaid}/mural/${muralid}/view`);
  };

  const handleExcluir = async (muralid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/mural/api/v1/${muralid}/`);
      const response = await api.get(`/escolas/api/v1/${escolaid}/`);
      setEscola(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleExcluir(muralid);
      } else {
        toast.error("Erro ao excluir mural");
        console.log("Erro ao excluir mural", error);
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
                  Murais da Escola
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "ano", accessor: "ano", align: "left" },
                      { Header: "opcoes", accessor: "opcoes", align: "right" },
                    ],
                    rows: escola?.objetos_murais
                      .sort((a, b) => b.ano - a.ano) // Ordena os murais em ordem decrescente de ano
                      .map((mural) => ({
                        ano: mural.ano,
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
                                onClick={() => handleView(mural.id)}
                              >
                                Visualizar
                              </MDButton>
                            </Grid>
                            <Grid item xs={12} sm={6} container>
                              <MDButton
                                variant="gradient"
                                color="error"
                                size="small"
                                onClick={() => handleExcluir(mural.id)}
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
            <Link to={`/escola/${escolaid}/murais/add`}>
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

export default EscolaMurais;
