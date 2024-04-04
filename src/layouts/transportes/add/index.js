import { Card, Grid, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { AuthContext } from "context/AuthContext";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Select from "examples/Select";
import { useContext, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";

function AddTransportes() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [tipo, setTipo] = useState("");
  const [nomeMotorista, setNomeMotorista] = useState("");
  const [nomeAuxiliar, setNomeAuxiliar] = useState("");
  const [itinerario, setItinerario] = useState("");

  const handleChangePlaca = (e) => {
    setPlaca(e.target.value);
  };

  const handleChangeAno = (e) => {
    setAno(e.target.value);
  };

  const handleChangeTipo = (e) => {
    setTipo(e.target.value);
  };

  const handleChangeNomeMotorista = (e) => {
    setNomeMotorista(e.target.value);
  };

  const handleChangeNomeAuxiliar = (e) => {
    setNomeAuxiliar(e.target.value);
  };

  const handleChangeItinerario = (e) => {
    setItinerario(e.target.value);
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/pessoas/transporte/api/v1/", {
        placa: placa,
        ano: ano,
        tipo: tipo,
        nomeMotorista: nomeMotorista,
        nomeAuxiliar: nomeAuxiliar,
        itinerario: itinerario,
      });
      navigate("/transportes");
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleAdd();
      } else {
        toast.error("Erro ao salvar novo transporte!");
        console.log("Erro ao salvar novo transporte!", error);
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
                bgColor="success"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Adicionar Novo Transporte
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
                        onChange={handleChangePlaca}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox>
                      <MDInput
                        type="number"
                        label="Digite o ano do contrato"
                        value={ano}
                        onChange={handleChangeAno}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox>
                      <Select
                        label="Selecione o tipo do veículo"
                        value={tipo}
                        onChange={handleChangeTipo}
                        fullWidth
                      >
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
                        onChange={handleChangeNomeMotorista}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox>
                      <MDInput
                        type="text"
                        label="Digite o nome da Auxiliar"
                        value={nomeAuxiliar}
                        onChange={handleChangeNomeAuxiliar}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox>
                      <MDInput
                        type="text"
                        label="Digite o itinerário do transporte"
                        value={itinerario}
                        onChange={handleChangeItinerario}
                        multiline
                        rows={5}
                        fullWidth
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox display="flex" flexDirection="row" justifyContent="center">
                      <MDBox mr={1}>
                        <MDButton variant="gradient" color="success" onClick={handleAdd}>
                          Salvar
                        </MDButton>
                      </MDBox>
                      <MDBox ml={1}>
                        <Link to="/transportes">
                          <MDButton variant="gradient" color="error">
                            Cancelar
                          </MDButton>
                        </Link>
                      </MDBox>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AddTransportes;
