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
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

function TransporteTelefones() {
  const { refreshToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { transporteid } = useParams();
  const navigate = useNavigate();
  const [transporte, setTransporte] = useState(null);

  useEffect(() => {
    const fetchTransporte = async () => {
      try {
        const response = await api.get(`/pessoas/transporte/api/v1/${transporteid}/`);
        setTransporte(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchTransporte();
        } else {
          toast.error("Erro ao carregar transporte");
          console.error("Erro ao carregar transporte:", error);
        }
        setLoading(false);
      }
    };
    fetchTransporte();
  }, []);

  const handleView = async (telefoneid) => {
    setLoading(true);
    navigate(`/transportes/${transporteid}/telefone/${telefoneid}/view`);
  };

  const handleExcluir = async (telefoneid) => {
    setLoading(true);
    try {
      await api.delete(`/pessoas/transporte/telefone/api/v1/${telefoneid}/`);
      const response = await api.get(`/pessoas/transporte/api/v1/${transporteid}/`);
      setTransporte(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleExcluir(telefoneid);
      } else {
        toast.error("Erro ao excluir telefone");
        console.log("Erro ao excluir telefone", error);
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
    { Header: "numero", accessor: "numero", align: "left" },
    { Header: "opcoes", accessor: "opcoes", align: "right" },
  ];

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
                  Telefones do Transporte
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns,
                    rows: transporte?.objetos_telefones.map((telefone) => ({
                      numero: telefone.numero,
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
                              onClick={() => handleView(telefone.id)}
                            >
                              Visualizar
                            </MDButton>
                          </Grid>
                          <Grid item xs={12} sm={6} container>
                            <MDButton
                              variant="gradient"
                              color="error"
                              size="small"
                              onClick={() => handleExcluir(telefone.id)}
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
            <Link to={`/transportes/${transporteid}/telefones/add`}>
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

export default TransporteTelefones;
