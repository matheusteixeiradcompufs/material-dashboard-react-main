import { Card, Grid, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Select from "examples/Select";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";
import Menu from "../components/Menu";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

function ViewEscolaCardapio() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid, cardapioid } = useParams();
  const [data, setData] = useState("");
  const [turno, setTurno] = useState("M");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardapio = async () => {
      try {
        const response = await api.get(`/escolas/cardapio/api/v1/${cardapioid}/`);
        setData(response.data.data);
        setTurno(response.data.turno);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchCardapio();
        } else {
          toast.error("Erro ao carregar dados do cardápio");
          console.log("Erro ao carregar dados do cardápio", error);
        }
        setLoading(false);
      }
    };
    fetchCardapio();
  }, []);

  const handleOnEditar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/cardapio/${cardapioid}/editar`);
  };

  const handleVoltar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/cardapios`);
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
                  Visualizar Cardápio da Escola
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={6}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="date"
                      variant="outlined"
                      label="Data"
                      value={data}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={6}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <Select label="Selecione um turno" value={turno} disabled>
                      <MenuItem value="M">Manhã</MenuItem>
                      <MenuItem value="T">Tarde</MenuItem>
                      <MenuItem value="N">Noite</MenuItem>
                    </Select>
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
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
      <MDBox pt={2} mb={3}>
        <Menu escolaid={escolaid} cardapioid={cardapioid} />
      </MDBox>
    </DashboardLayout>
  );
}

export default ViewEscolaCardapio;
