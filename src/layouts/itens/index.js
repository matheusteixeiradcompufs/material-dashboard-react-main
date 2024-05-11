/**
 * ITENS. Esse é o layout que renderiza a página que lista os ítens de cardápio de merenda.
 * A partir dela é possível também acessar as outras funções do CRUD dos ítens.
 * @file
 */
import { Card, Fab, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import AddIcon from "@mui/icons-material/Add";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

/**
 * Componente funcional que representa a página de itens da merenda.
 * @module itens
 * @returns {JSX.Element} O componente React para renderizar.
 */
function Itens() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    /**
     * Função assíncrona para buscar os itens da API.
     * @returns {Promise<void>}
     */
    const fetchItens = async () => {
      try {
        const response = await api.get("/escolas/cardapio/item/api/v1/");
        setItens(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchItens();
        } else {
          toast.error("Erro ao carregar ítens da merenda!");
          console.log("Erro ao carregar ítens da merenda!", error);
        }
        setLoading(false);
      }
    };
    fetchItens();
  }, []);

  /**
   * Navega para a página de visualização do item.
   * @param {string} itemId - O ID do item a ser visualizado.
   */
  const handleView = (itemId) => {
    setLoading(true);
    navigate(`/itemmerenda/${itemId}/view`);
  };

  /**
   * Exclui um item da merenda.
   * @param {string} itemId - O ID do item a ser excluído.
   */
  const handleExcluir = async (itemId) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/cardapio/item/api/v1/${itemId}/`);
      const response = await api.get("/escolas/cardapio/item/api/v1/");
      setItens(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleExcluir(itemId);
      } else {
        toast.error("Erro ao excluir item!");
        console.log("Erro ao excluir item!", error);
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
                  Itens da Merenda
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "Ítem", accessor: "item", width: "70%", align: "left" },
                      { Header: "", accessor: "opcoes", align: "center" },
                    ],
                    rows: [
                      ...itens?.map((objeto) => ({
                        item: objeto.nome,
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
            <Link to={`/itensmerenda/add`}>
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

export default Itens;
