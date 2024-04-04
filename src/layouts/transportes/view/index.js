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

function ViewTransportes() {
  const { refreshToken } = useContext(AuthContext);
  const { transporteid } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [tipo, setTipo] = useState("");
  const [nomeMotorista, setNomeMotorista] = useState("");
  const [nomeAuxiliar, setNomeAuxiliar] = useState("");
  const [itinerario, setItinerario] = useState("");

  useEffect(() => {
    const fetchTransporte = async () => {
      try {
        const response = await api.get(`/pessoas/transporte/api/v1/${transporteid}/`);
        setPlaca(response.data.placa || "");
        setAno(response.data.ano || "");
        setTipo(response.data.tipo || "");
        setNomeMotorista(response.data.nomeMotorista || "");
        setNomeAuxiliar(response.data.nomeAuxiliar || "");
        setItinerario(response.data.itinerario || "");
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchTransporte();
        } else {
          toast.error("Erro ao carregar dados do transporte!");
          console.log("Erro ao carregar dados do transporte!", error);
        }
        setLoading(false);
        navigate("/transportes");
      }
    };
    fetchTransporte();
  }, []);

  const handleOnEditar = () => {
    setLoading(true);
    navigate(`/transportes/${transporteid}/editar`);
  };

  const handleVoltar = () => {
    setLoading(true);
    navigate(`/transportes`);
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
                  Visualizar Transporte
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2} mb={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MDBox>
                      <MDInput
                        type="text"
                        label="Digite a placa do veículo"
                        value={placa}
                        fullWidth
                        disabled
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox>
                      <MDInput
                        type="number"
                        label="Digite o ano do contrato"
                        value={ano}
                        fullWidth
                        disabled
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox>
                      <Select label="Selecione o tipo do veículo" value={tipo} fullWidth disabled>
                        <MenuItem value="C">Carro</MenuItem>
                        <MenuItem value="O">Ônibus</MenuItem>
                        <MenuItem value="V">Van</MenuItem>
                        <MenuItem value="X">Outros</MenuItem>
                      </Select>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox>
                      <MDInput
                        type="text"
                        label="Digite o nome do Motorista"
                        value={nomeMotorista}
                        fullWidth
                        disabled
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox>
                      <MDInput
                        type="text"
                        label="Digite o nome da Auxiliar"
                        value={nomeAuxiliar}
                        fullWidth
                        disabled
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox>
                      <MDInput
                        type="text"
                        label="Digite o itinerário do transporte"
                        value={itinerario}
                        multiline
                        rows={5}
                        fullWidth
                        disabled
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox display="flex" flexDirection="row" justifyContent="center">
                      <MDBox mr={1}>
                        <MDButton variant="gradient" color="warning" onClick={handleOnEditar}>
                          Editar
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
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={2} mb={3} mt={3}>
        <Menu transporteid={transporteid} setLoading={setLoading} />
      </MDBox>
    </DashboardLayout>
  );
}

export default ViewTransportes;
