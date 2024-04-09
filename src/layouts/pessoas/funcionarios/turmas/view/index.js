import { Card, Grid, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Select from "examples/Select";
import Menu from "../components/Menu";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

function ViewFuncionarioTurma() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { funcionarioid, turmaid } = useParams();
  const [loading, setLoading] = useState(true);
  const [turma, setTurma] = useState(null);
  const [nome, setNome] = useState("");
  const [turno, setTurno] = useState("M");
  const [ano, setAno] = useState("");

  useEffect(() => {
    const fetchTurma = async () => {
      try {
        const response = await api.get(`/escolas/sala/turma/api/v1/${turmaid}/`);
        setTurma(response.data);
        setNome(response.data.nome);
        setAno(response.data.ano);
        setTurno(response.data.turno);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchTurma();
        } else {
          toast.error("Erro ao carregar os dados da turma!");
          console.log("Erro ao carregar os dados da turma!", error);
        }
        setLoading(false);
      }
    };
    fetchTurma();
  }, []);

  const handleVoltar = () => {
    setLoading(true);
    navigate(`/pessoas/funcionario/${funcionarioid}/turmas`);
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
                  Visualizar Turma
                </MDTypography>
              </MDBox>
              <Grid container spacing={1} mb={2}>
                <Grid item xs={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="text"
                      variant="outlined"
                      label="Nome da Turma"
                      value={nome}
                      fullWidth
                      disabled
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={6}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <Select label="Selecione o Turno" value={turno} disabled>
                      <MenuItem value="M">Manhã</MenuItem>
                      <MenuItem value="T">Tarde</MenuItem>
                      <MenuItem value="N">Noite</MenuItem>
                    </Select>
                  </MDBox>
                </Grid>
                <Grid item xs={6}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <MDInput
                      type="number"
                      variant="outlined"
                      label="Digite o Ano da Turma"
                      value={ano}
                      fullWidth
                      disabled
                      inputProps={{
                        min: 2010,
                        max: 2050,
                        step: 1,
                      }}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" flexDirection="row" justifyContent="center">
                    <MDBox justifyContent="center">
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
        <Menu turma={turma} />
      </MDBox>
    </DashboardLayout>
  );
}

export default ViewFuncionarioTurma;
