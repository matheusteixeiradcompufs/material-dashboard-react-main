import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Transfer from "../components/Transfer";
import { AuthContext } from "context/AuthContext";

function ManageEscolaCardapioItens() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid, cardapioid } = useParams();
  const [loading, setLoading] = useState(true);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const res = await api.get(`/escolas/cardapio/api/v1/${cardapioid}/`);
        setRight(res.data.objetos_itens);
        const response = await api.get("/escolas/cardapio/item/api/v1/");
        setLeft(
          response.data.filter(
            (item) => !res.data.objetos_itens.some((element) => element.id === item.id)
          )
        );
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchItens();
        } else {
          toast.error("Erro ao carregar cardápio!");
          console.log("Erro ao carregar cardápio!", error);
        }
        setLoading(false);
      }
    };
    fetchItens();
  }, []);

  const handleSalvar = async () => {
    setLoading(true);
    try {
      await api.patch(`/escolas/cardapio/api/v1/${cardapioid}/`, {
        itens: right.map((item) => item.id),
      });
      navigate(`/escola/${escolaid}/cardapio/${cardapioid}/itens`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleSalvar();
      } else {
        toast.error("Erro ao salvar itens no cardápio!");
        console.log("Erro ao salvar itens no cardápio!", error);
      }
      setLoading(false);
    }
  };

  const handleCancelar = () => {
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
                  Selecione os Itens do Cardápio
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2} display="flex" justifyContent="center">
                <Transfer left={left} setLeft={setLeft} right={right} setRight={setRight} />
              </MDBox>
              <MDBox pt={3} px={2} mb={2} display="flex" justifyContent="center">
                <MDBox mr={1}>
                  <MDButton variant="gradient" color="success" onClick={handleSalvar}>
                    Salvar
                  </MDButton>
                </MDBox>
                <MDBox ml={1}>
                  <MDButton variant="gradient" color="error" onClick={handleCancelar}>
                    Cancelar
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default ManageEscolaCardapioItens;
