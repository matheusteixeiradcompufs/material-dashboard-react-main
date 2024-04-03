import { Card, Fab, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import ManageIcon from "@mui/icons-material/Settings";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";

function EscolaCardapioItens() {
  const navigate = useNavigate();
  const { escolaid, cardapioid } = useParams();
  const [loading, setLoading] = useState(true);
  const [itens, setItens] = useState([]);
  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await api.get(`/escolas/cardapio/api/v1/${cardapioid}/`);
        setItens(response.data.objetos_itens);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar cardápio!");
        console.log("Erro ao carregar cardápio!", error);
        setLoading(false);
      }
    };
    fetchItens();
  }, []);
  const handleView = (itemid) => {
    setLoading(true);
    navigate(`/escola/${escolaid}/cardapio/${cardapioid}/item/${itemid}/view`);
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
                  Itens do Cardápio
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "ítem", accessor: "item", width: "85%", align: "left" },
                      { Header: "", accessor: "opcoes", align: "center" },
                    ],
                    rows: [
                      ...itens?.map((objeto) => ({
                        item: objeto.nome,
                        opcoes: (
                          <MDBox display="flex" flexDirection="row">
                            <MDButton
                              variant="gradient"
                              color="info"
                              size="small"
                              onClick={() => handleView(objeto.id)}
                            >
                              Visualizar
                            </MDButton>
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
            <Link to={`/escola/${escolaid}/cardapio/${cardapioid}/itens/manage`}>
              <Fab
                color="info"
                aria-label="Gerenciar Cardápio"
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

export default EscolaCardapioItens;
