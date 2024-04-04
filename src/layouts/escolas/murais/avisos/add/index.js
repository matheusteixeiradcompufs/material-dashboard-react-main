import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { AuthContext } from "context/AuthContext";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "services/apiClient";

function AddEscolaMuralAvisos() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { escolaid, muralid } = useParams();
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");

  const handleChangeTitulo = (e) => {
    setTitulo(e.target.value);
  };

  const handleChangeTexto = (e) => {
    setTexto(e.target.value);
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/mural/aviso/api/v1/", {
        titulo: titulo,
        texto: texto,
        mural: muralid,
      });
      navigate(`/escola/${escolaid}/mural/${muralid}/avisos`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleAdd();
      } else {
        toast.error("Erro ao salvar aviso!");
        console.log("Erro ao salvar aviso!", error);
      }
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setLoading(true);
    navigate(`/escola/${escolaid}/mural/${muralid}/avisos`);
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
                coloredShadow="success"
              >
                <MDTypography variant="h6" color="white">
                  Inserir Novo Aviso no Mural da Escola
                </MDTypography>
              </MDBox>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={3} px={2}>
                    <MDInput
                      variant="outlined"
                      label="Título"
                      value={titulo}
                      onChange={handleChangeTitulo}
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={3} px={2}>
                    <MDInput
                      variant="outlined"
                      label="Texto"
                      multiline
                      rows={5}
                      value={texto}
                      onChange={handleChangeTexto}
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDBox pt={2} px={2} mb={2} display="flex" justifyContent="center">
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

export default AddEscolaMuralAvisos;
