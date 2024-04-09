import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";
import Menu from "../components/Menu";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

function ViewEscolaMural() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid, muralid } = useParams();
  const [ano, setAno] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMural = async () => {
      try {
        const response = await api.get(`/escolas/mural/api/v1/${muralid}/`);
        setAno(response.data.ano);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchMural();
        } else {
          toast.error("Erro ao acessar os dados do mural!");
          console.log("Erro ao acessar os dados do mural!", error);
        }
        setLoading(false);
      }
    };
    fetchMural();
  }, []);

  const handleOnEditar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/mural/${muralid}/editar`);
  };

  const handleVoltar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/murais`);
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
                  Visualizar Mural da Escola
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="number"
                      variant="outlined"
                      label="Informe o Ano do Mural"
                      value={ano}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDBox mr={1}>
                      <MDButton variant="contained" color="warning" onClick={handleOnEditar}>
                        Modificar
                      </MDButton>
                    </MDBox>
                    <MDBox ml={1}>
                      <MDButton variant="contained" color="error" onClick={handleVoltar}>
                        Voltar
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={2} mb={3} mt={3}>
        <Menu escolaid={escolaid} muralid={muralid} />
      </MDBox>
    </DashboardLayout>
  );
}

export default ViewEscolaMural;
