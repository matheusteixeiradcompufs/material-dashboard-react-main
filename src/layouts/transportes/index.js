/**
 * TRANSPORTES. Esse é o layout que renderiza a página que lista os transportes cadastrados.
 * A partir dela é possível também acessar as outras funções do CRUD dos transportes.
 * @file
 */
import AddIcon from "@mui/icons-material/Add";
import { Card, Fab, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { AuthContext } from "context/AuthContext";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";

/**
 * Componente para exibir a lista de transportes.
 * @module transportes
 * @returns {JSX.Element} Componente para exibir a lista de transportes.
 */
function Transportes() {
  const { refreshToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [transportes, setTransportes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransportes = async () => {
      try {
        const response = await api.get("/pessoas/transporte/api/v1/");
        setTransportes(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchTransportes();
        } else {
          toast.error("Erro ao carregar os transportes!");
          console.log("Erro ao carregar os transportes!", error);
        }
        setLoading(false);
      }
    };
    fetchTransportes();
  }, []);

  /**
   * Navega para a página de visualização de um transporte específico.
   * @param {string} transporteId - O ID do transporte.
   */
  const handleView = async (transporteId) => {
    setLoading(true);
    navigate(`/transportes/${transporteId}/view`);
  };

  /**
   * Exclui um transporte específico.
   * @param {string} transporteId - O ID do transporte.
   */
  const handleExcluir = async (transporteId) => {
    setLoading(true);
    try {
      await api.delete(`/pessoas/transporte/api/v1/${transporteId}/`);
      const response = await api.get("/pessoas/transporte/api/v1/");
      setTransportes(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleExcluir(transporteId);
      } else {
        toast.error("Erro ao excluir o transporte!");
        console.log("Erro ao excluir o transporte!", error);
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
                  Transportes
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "placa", accessor: "placa", align: "left" },
                      { Header: "ano", accessor: "ano", align: "center" },
                      { Header: "tipo", accessor: "tipo", align: "center" },
                      { Header: "opções", accessor: "opcoes", align: "center" },
                    ],
                    rows:
                      transportes?.map((transporte) => ({
                        placa: transporte.placa,
                        ano: transporte.ano,
                        tipo: transporte.tipo,
                        opcoes: (
                          <MDBox display="flex" flexDirection="row">
                            <MDBox mr={1}>
                              <MDButton
                                variant="gradient"
                                color="info"
                                size="small"
                                onClick={() => handleView(transporte.id)}
                              >
                                Visualizar
                              </MDButton>
                            </MDBox>
                            <MDBox ml={1}>
                              <MDButton
                                variant="gradient"
                                color="error"
                                size="small"
                                onClick={() => handleExcluir(transporte.id)}
                              >
                                Excluir
                              </MDButton>
                            </MDBox>
                          </MDBox>
                        ),
                      })) || [],
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
            <Link to="/transportes/add">
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

export default Transportes;
