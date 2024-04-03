import { Card, Grid, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Select from "examples/Select";

function AddAlunoBoletins() {
  const navigate = useNavigate();
  const { alunoid } = useParams();
  const [escolas, setEscolas] = useState([]);
  const [salas, setSalas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedEscola, setSelectedEscola] = useState("");
  const [selectedSala, setSelectedSala] = useState("");
  const [selectedTurma, setSelectedTurma] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const response = await api.get("/escolas/api/v1/");
        setEscolas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar dados");
        console.error("Erro ao carregar dados:", error);
        setLoading(false);
      }
    };
    fetchAluno();
  }, []);
  const handleChangeEscola = (e) => {
    setSelectedEscola(e.target.value);
    const escolaView = escolas.find((objeto) => objeto.id === e.target.value);
    setSalas(escolaView.objetos_salas);
    setTurmas([]);
    setSelectedSala("");
    setSelectedTurma("");
  };
  const handleChangeSala = (e) => {
    setSelectedSala(e.target.value);
    const salaView = salas.find((objeto) => objeto.id === e.target.value);
    setTurmas(salaView.objetos_turmas);
    setSelectedTurma("");
  };
  const handleChangeTurma = (e) => {
    setSelectedTurma(e.target.value);
  };
  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/pessoas/aluno/boletim/api/v1/", {
        turma: selectedTurma,
        aluno: alunoid,
      });
      navigate(`/pessoas/aluno/${alunoid}/boletins`);
    } catch (error) {
      toast.error("Erro ao matricular aluno na turma");
      console.log("Erro ao matricular aluno na turma", error);
      setLoading(false);
    }
  };
  const handleCancelar = () => {
    setLoading(true);
    navigate(`/pessoas/aluno/${alunoid}/boletins`);
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
                  Matricular Aluno
                </MDTypography>
              </MDBox>
              <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={12}>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <Select
                      value={selectedEscola}
                      label="Selecione uma escola"
                      onChange={handleChangeEscola}
                      fullWidth
                    >
                      {escolas?.map((escola, index) => (
                        <MenuItem key={index} value={escola.id}>
                          {escola.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <Select
                      value={selectedSala}
                      onChange={handleChangeSala}
                      label="Selecione uma Sala de Aula"
                      fullWidth
                    >
                      {salas?.map((sala, index) => (
                        <MenuItem key={index} value={sala.id}>
                          {sala.numero}
                        </MenuItem>
                      ))}
                    </Select>
                  </MDBox>
                  <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                    <Select
                      value={selectedTurma}
                      onChange={handleChangeTurma}
                      label="Selecione uma Turma"
                      fullWidth
                    >
                      {turmas?.map((turma, index) => (
                        <MenuItem key={index} value={turma.id}>
                          {turma.nome} em {turma.ano} turno {turma.turno}
                        </MenuItem>
                      ))}
                    </Select>
                  </MDBox>
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

export default AddAlunoBoletins;
