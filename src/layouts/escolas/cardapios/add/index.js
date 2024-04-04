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
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";

function AddEscolaCardapios() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid } = useParams();
  const [data, setData] = useState("");
  const [turno, setTurno] = useState("M");
  const [loading, setLoading] = useState(false);

  const handleChangeData = (e) => {
    setData(e.target.value);
  };

  const handleChangeTurno = (e) => {
    setTurno(e.target.value);
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/cardapio/api/v1/", {
        data: data,
        turno: turno,
        escola: escolaid,
      });
      navigate(`/escola/${escolaid}/cardapios`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleAdd();
      } else {
        toast.error("Erro ao cadastrar cardapio");
        console.log("Erro ao cadastrar cardapio", error);
      }
      setLoading(false);
    }
  };

  const handleCancelar = () => {
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
                  Cadastrar Novo Cardápio da Escola
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
                      onChange={handleChangeData}
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={6}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <Select label="Escolha o turno" value={turno} onChange={handleChangeTurno}>
                      <MenuItem value="M">Manhã</MenuItem>
                      <MenuItem value="T">Tarde</MenuItem>
                      <MenuItem value="N">Noite</MenuItem>
                    </Select>
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDBox mr={1}>
                      <MDButton variant="contained" color="success" onClick={handleAdd}>
                        Salvar
                      </MDButton>
                    </MDBox>
                    <MDBox ml={1}>
                      <MDButton variant="contained" color="error" onClick={handleCancelar}>
                        Cancelar
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

export default AddEscolaCardapios;
