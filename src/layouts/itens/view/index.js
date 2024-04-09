import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useNavigate, useParams } from "react-router-dom";
import MDInput from "components/MDInput";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

function ViewItem() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { itemid } = useParams();
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await api.get(`/escolas/cardapio/item/api/v1/${itemid}/`);
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
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

  const handleOnEditar = () => {
    setLoading(true);
    navigate(`/itemmerenda/${itemid}/editar`);
  };

  const handleVoltar = () => {
    setLoading(true);
    navigate(`/itensmerenda`);
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
                  Detalhes do Item
                </MDTypography>
              </MDBox>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={3} px={2}>
                    <MDInput
                      variant="outlined"
                      label="Nome do Ítem"
                      value={nome}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={3} px={2}>
                    <MDInput
                      variant="outlined"
                      label="Descrição do Ítem"
                      multiline
                      rows={5}
                      value={descricao}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={3} px={2} mb={2} display="flex" justifyContent="center">
                    <MDBox mr={1}>
                      <MDButton variant="gradient" color="info" onClick={handleOnEditar}>
                        Modificar
                      </MDButton>
                    </MDBox>
                    <MDBox ml={1}>
                      <MDButton variant="gradient" color="error" onClick={handleVoltar}>
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
    </DashboardLayout>
  );
}

export default ViewItem;
