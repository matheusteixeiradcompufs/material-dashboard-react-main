/**
 * CARDÁPIOS. Esse é o layout que renderiza a página que lista os cardápios de merenda de uma escola.
 * A partir dela é possível também acessar as outras funções do CRUD dos cardápios.
 * @file
 */
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
import { format } from "date-fns";

/**
 * Componente para exibir os cardápios de uma escola e fornecer opções de visualização e exclusão.
 * @module escolas/cardapios
 * @returns {JSX.Element} Componente do cardápio da escola.
 */
function EscolaCardapios() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid } = useParams();
  const [cardapios, setCardapios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardapios = async () => {
      try {
        const response = await api.get(`/escolas/api/v1/${escolaid}/`);
        setCardapios(response.data.objetos_cardapios);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchCardapios();
        } else {
          toast.error("Erro ao carregar escola");
          console.error("Erro ao carregar escola:", error);
        }
        setLoading(false);
      }
    };
    fetchCardapios();
  }, []);

  /**
   * Formata a data no formato "dd/MM/yyyy".
   * @param {string} date - A data a ser formatada.
   * @returns {string} A data formatada.
   */
  const formatarData = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    newDate.setHours(0);
    return format(newDate, "dd/MM/yyyy");
  };

  /**
   * Navega para a página de visualização do cardápio.
   * @param {string} cardapioid - O ID do cardápio a ser visualizado.
   */
  const handleView = (cardapioid) => {
    setLoading(true);
    navigate(`/escola/${escolaid}/cardapio/${cardapioid}/view`);
  };

  /**
   * Manipula a exclusão de um cardápio.
   * @param {string} cardapioid - O ID do cardápio a ser excluído.
   */
  const handleExcluir = async (cardapioid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/cardapio/api/v1/${cardapioid}/`);
      const response = await api.get(`/escolas/api/v1/${escolaid}/`);
      setCardapios(response.data.objetos_cardapios);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleExcluir(cardapioid);
      } else {
        toast.error("Erro ao excluir cardapio");
        console.error("Erro ao excluir cardapio", error);
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
                  Cardápios da Escola
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "data", width: "35%", accessor: "data", align: "left" },
                      { Header: "turno", width: "35%", accessor: "turno", align: "center" },
                      { Header: "opcoes", accessor: "opcoes", align: "center" },
                    ],
                    rows: cardapios
                      .sort((a, b) => new Date(b.data) - new Date(a.data))
                      .map((cardapio) => ({
                        data: formatarData(cardapio.data),
                        turno: cardapio.turno,
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
                                onClick={() => handleView(cardapio.id)}
                              >
                                Visualizar
                              </MDButton>
                            </Grid>
                            <Grid item xs={12} sm={6} container>
                              <MDButton
                                variant="gradient"
                                color="error"
                                size="small"
                                onClick={() => handleExcluir(cardapio.id)}
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
            <Link to={`/escola/${escolaid}/cardapios/add`}>
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

export default EscolaCardapios;
