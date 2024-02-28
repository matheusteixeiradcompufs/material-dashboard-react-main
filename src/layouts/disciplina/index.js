import { Card, Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDInput from "components/MDInput";

function Disciplinas() {
  const [loading, setLoading] = useState(false);
  const [disciplina, setDisciplina] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);
  const [addDisciplina, setAddDisciplina] = useState(false);
  const [editarDisciplina, setEditarDisciplina] = useState(false);
  const [listarDisciplina, setListarDisciplina] = useState(true);
  const [nomeDisciplina, setNomeDisciplina] = useState("");

  useEffect(() => {
    const fetchDisciplina = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/escolas/disciplina/api/v1/`);
        setDisciplinas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar disciplina!");
        console.log("Erro ao carregar disciplina!", error);
        setLoading(false);
      }
    };
    fetchDisciplina();
  }, []);

  const handleChangeNomeDisciplina = (nome) => {
    setNomeDisciplina(nome.target.value);
  };

  const handleOnAddDisciplina = () => {
    handleOffEditarDisciplina();
    handleOffListarDisciplina();
    setAddDisciplina(true);
  };

  const handleOffAddDisciplina = () => {
    setAddDisciplina(false);
    setNomeDisciplina("");
  };

  const handleOnEditarDisciplina = (index) => {
    handleOffAddDisciplina();
    handleOffListarDisciplina();
    setEditarDisciplina(true);
    setNomeDisciplina(disciplinas[index].nome);
    setDisciplina(disciplinas[index]);
  };

  const handleOffEditarDisciplina = () => {
    setEditarDisciplina(false);
    setNomeDisciplina("");
    setDisciplina(null);
  };

  const handleOnListarDisciplina = () => {
    handleOffAddDisciplina();
    handleOffEditarDisciplina();
    setListarDisciplina(true);
  };

  const handleOffListarDisciplina = () => {
    setListarDisciplina(false);
  };

  const handleAddDisciplina = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/disciplina/api/v1/", {
        nome: nomeDisciplina,
      });
      const response = await api.get("/escolas/disciplina/api/v1/");
      setDisciplinas(response.data);
      setLoading(false);
      handleOnListarDisciplina();
    } catch (error) {
      toast.error("Erro ao adicionar nova disciplina!");
      console.log("Erro ao adicionar nova disciplina!", error);
      setLoading(false);
    }
  };

  const handleExcluir = async (disciplinaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/disciplina/api/v1/${disciplinaid}/`);
      const response = await api.get("/escolas/disciplina/api/v1/");
      setDisciplinas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir disciplina!");
      console.log("Erro ao excluir disciplina!", error);
      setLoading(false);
    }
  };

  const handleEditarDisciplina = async () => {
    setLoading(true);
    try {
      await api.patch(`/escolas/disciplina/api/v1/${disciplina.id}/`, {
        nome: nomeDisciplina,
      });
      const response = await api.get("/escolas/disciplina/api/v1/");
      setDisciplinas(response.data);
      handleOnListarDisciplina();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao alterar disciplina!");
      console.log("Erro ao alterar disciplina!", error);
      setLoading(false);
    }
  };

  const columns = [
    { Header: "nome", accessor: "nome", width: "80%", align: "left" },
    { Header: "opções", accessor: "opcoes", align: "center" },
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
            {listarDisciplina ? (
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
                    Disciplinas
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} px={2}>
                  <DataTable
                    table={{
                      columns,
                      rows: disciplinas
                        ? disciplinas.map((disciplina, index) => ({
                            nome: disciplina.nome,
                            opcoes: (
                              <Grid
                                container
                                spacing={2}
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item xs={12} sm={6} container>
                                  <MDButton
                                    variant="gradient"
                                    color="info"
                                    size="small"
                                    onClick={() => handleOnEditarDisciplina(index)}
                                  >
                                    Editar
                                  </MDButton>
                                </Grid>
                                <Grid item xs={12} sm={6} container>
                                  <MDButton
                                    variant="gradient"
                                    color="error"
                                    size="small"
                                    onClick={() => handleExcluir(disciplina.id)}
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
            ) : (
              <MDBox></MDBox>
            )}
            {addDisciplina ? (
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
                    Cadastrar Nova Disciplina
                  </MDTypography>
                </MDBox>
                <Grid container spacing={3} mb={2}>
                  <Grid item xs={12} sm={12}>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDInput
                        type="text"
                        variant="outlined"
                        label="Nome da Disciplina"
                        value={nomeDisciplina}
                        onChange={handleChangeNomeDisciplina}
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid container spacing={3} mb={2}>
                  <Grid item xs={12} sm={12}>
                    <MDBox display="flex" flexDirection="row" justifyContent="center">
                      <MDBox justifyContent="center">
                        <MDButton variant="contained" color="success" onClick={handleAddDisciplina}>
                          Cadastrar
                        </MDButton>
                      </MDBox>
                      <MDBox justifyContent="center" ml={2}>
                        <MDButton
                          variant="contained"
                          color="error"
                          onClick={handleOnListarDisciplina}
                        >
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
            {editarDisciplina ? (
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
                    Editar Disciplina
                  </MDTypography>
                </MDBox>
                <Grid container spacing={3} mb={2}>
                  <Grid item xs={12} sm={12}>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDInput
                        type="text"
                        variant="outlined"
                        label="Nome da Disciplina"
                        value={nomeDisciplina}
                        onChange={handleChangeNomeDisciplina}
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid container spacing={3} mb={2}>
                  <Grid item xs={12} sm={12}>
                    <MDBox display="flex" flexDirection="row" justifyContent="center">
                      <MDBox justifyContent="center">
                        <MDButton
                          variant="contained"
                          color="success"
                          onClick={handleEditarDisciplina}
                        >
                          Salvar
                        </MDButton>
                      </MDBox>
                      <MDBox justifyContent="center" ml={2}>
                        <MDButton
                          variant="contained"
                          color="error"
                          onClick={handleOnListarDisciplina}
                        >
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
          {!addDisciplina ? (
            <Grid item xs={12} mt={6}>
              <Fab
                color="success"
                aria-label="add"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
                onClick={handleOnAddDisciplina}
              >
                <AddIcon color="white" />
              </Fab>
            </Grid>
          ) : (
            <MDBox></MDBox>
          )}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Disciplinas;
