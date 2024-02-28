import { Card, Fab, Grid, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";

function TurmasSala() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [sala, setSala] = useState(null);
  const [addTurma, setAddTurma] = useState(false);
  const [nomeTurma, setNomeTurma] = useState("");
  const [selectedTurno, setSelectedTurno] = useState("M");
  const [anoTurma, setAnoTurma] = useState("");

  useEffect(() => {
    const fetchSala = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/escolas/sala/api/v1/${id}/`);
        setSala(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar turmas da sala!");
        console.log("Erro ao carregar turmas da sala", error);
        setLoading(false);
      }
    };
    fetchSala();
  }, []);

  const handleOnAddTurma = () => {
    setAddTurma(true);
  };

  const handleOffAddTurma = () => {
    setAddTurma(false);
    setNomeTurma("");
    setSelectedTurno("M");
    setAnoTurma("");
  };

  const handleChangeNomeTurma = (nome) => {
    setNomeTurma(nome.target.value);
  };

  const handleTurnoChange = (turno) => {
    setSelectedTurno(turno.target.value);
  };

  const handleChangeAnoTurma = (ano) => {
    setAnoTurma(ano.target.value);
  };

  const handleAddTurma = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/sala/turma/api/v1/", {
        nome: nomeTurma,
        ano: anoTurma,
        turno: selectedTurno,
        sala: sala.id,
      });
      const response = await api.get(`/escolas/sala/api/v1/${id}/`);
      setSala(response.data);
      setLoading(false);
      handleOffAddTurma();
    } catch (error) {
      toast.error("Erro ao cadastrar nova turma!");
      console.log("Erro ao cadastrar nova turma!", error);
      setLoading(false);
    }
  };

  const handleExcluir = async (turmaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/sala/turma/api/v1/${turmaid}`);
      const response = await api.get(`/escolas/sala/api/v1/${id}`);
      setSala(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir a turma!");
      console.log("Erro ao excluir a turma!", error);
      setLoading(false);
    }
  };

  const columns = [
    { Header: "nome", accessor: "nome", align: "left" },
    { Header: "ano", accessor: "ano", align: "left" },
    { Header: "opcoes", accessor: "opcoes", align: "center" },
  ];

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
                  Turmas da Sala {String(sala?.numero).padStart(3, "0")}
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns,
                    rows: sala?.objetos_turmas
                      ? sala.objetos_turmas.map((turma) => ({
                          nome: turma.nome,
                          ano: turma.ano,
                          opcoes: (
                            <Grid
                              container
                              spacing={2}
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Grid item xs={12} sm={6} container>
                                <Link to={`/turma/${turma.id}`}>
                                  <MDButton variant="gradient" color="info" size="small">
                                    Visualizar
                                  </MDButton>
                                </Link>
                              </Grid>
                              <Grid item xs={12} sm={6} container>
                                <MDButton
                                  variant="gradient"
                                  color="error"
                                  size="small"
                                  onClick={() => handleExcluir(turma.id)}
                                >
                                  Excluir
                                </MDButton>
                              </Grid>
                            </Grid>
                          ),
                        }))
                      : [],
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} mt={6}>
            {addTurma ? (
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
                    Cadastrar Nova Turma
                  </MDTypography>
                </MDBox>
                <Grid container spacing={3} mb={2}>
                  <Grid item xs={12} sm={12}>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDInput
                        type="text"
                        variant="outlined"
                        label="Nome da Turma"
                        value={nomeTurma}
                        onChange={handleChangeNomeTurma}
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid container spacing={3} mb={2}>
                  <Grid item xs={12} sm={6}>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <Select
                        value={selectedTurno}
                        onChange={handleTurnoChange}
                        style={{ width: "100%", height: 45 }}
                      >
                        <MenuItem value="M">Manhã</MenuItem>
                        <MenuItem value="T">Tarde</MenuItem>
                        <MenuItem value="N">Noite</MenuItem>
                      </Select>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDInput
                        type="number"
                        variant="outlined"
                        label="Ano"
                        value={anoTurma}
                        onChange={handleChangeAnoTurma}
                        style={{ width: "100%" }}
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
                        <MDButton variant="contained" color="success" onClick={handleAddTurma}>
                          Cadastrar
                        </MDButton>
                      </MDBox>
                      <MDBox justifyContent="center" ml={2}>
                        <MDButton variant="contained" color="error" onClick={handleOffAddTurma}>
                          Cancelar
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </Grid>
                </Grid>
              </Card>
            ) : (
              <MDBox></MDBox>
            )}
          </Grid>
          {!addTurma ? (
            <Grid item xs={12} mt={6}>
              <Fab
                color="success"
                aria-label="add"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
                onClick={handleOnAddTurma}
              >
                <AddIcon color="white" />
              </Fab>
            </Grid>
          ) : (
            <Grid item xs={12} mt={6}>
              <Fab
                color="error"
                aria-label="cancelar"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
                onClick={handleOffAddTurma}
              >
                <CancelIcon color="white" />
              </Fab>
            </Grid>
          )}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default TurmasSala;
