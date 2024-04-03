import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";

function ViewEscolaCardapioItem() {
  const navigate = useNavigate();
  const { escolaid, cardapioid, itemid } = useParams();
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
        toast.error("Erro ao carregar dados do ítem");
        console.log("Erro ao carregar dados do ítem", error);
        setLoading(false);
      }
    };
    fetchItens();
  }, []);
  const handleVoltar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/cardapio/${cardapioid}/itens`);
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
                  Detalhes do Item
                </MDTypography>
              </MDBox>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={3} px={2}>
                    <MDInput variant="outlined" label="Nome" value={nome} fullWidth disabled />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={3} px={2}>
                    <MDInput
                      variant="outlined"
                      label="Descrição"
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
                    <MDButton variant="gradient" color="error" onClick={handleVoltar}>
                      Voltar
                    </MDButton>
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

export default ViewEscolaCardapioItem;
