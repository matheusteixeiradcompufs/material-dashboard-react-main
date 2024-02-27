import React, { useEffect, useState } from "react";
import { Grid, Card, Fab } from "@mui/material"; // Importe o componente Fab
import AddIcon from "@mui/icons-material/Add";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable"; // Importando o componente DataTable
import { api } from "services/apiClient";
import { Audio } from "react-loader-spinner";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Escolas() {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cadastrar, setCadastrar] = useState(false);
  const [cnpjEscola, setCnpjEscola] = useState("");
  const [nomeEscola, setNomeEscola] = useState("");
  const [enderecoEscola, setEnderecoEscola] = useState("");
  const [descricaoEscola, setDescricaoEscola] = useState("");

  useEffect(() => {
    const fetchEscolas = async () => {
      try {
        const response = await api.get("/escolas/api/v1/");
        setEscolas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar escolas");
        console.error("Erro ao carregar escolas:", error);
        setLoading(false);
      }
    };
    fetchEscolas();
  }, []);

  const handleSetCnpjEscola = (e) => {
    setCnpjEscola(e.target.value);
  };

  const handleSetNomeEscola = (e) => {
    setNomeEscola(e.target.value);
  };

  const handleSetEnderecoEscola = (e) => {
    setEnderecoEscola(e.target.value);
  };

  const handleSetDescricaoEscola = (e) => {
    setDescricaoEscola(e.target.value);
  };

  const handleSetCadastrar = (value) => {
    setCadastrar(value);
    if (!value) {
      setCnpjEscola("");
      setNomeEscola("");
      setEnderecoEscola("");
      setDescricaoEscola("");
    }
  };

  const handleVisualizar = (id) => {
    // Lógica para visualizar detalhes da escola com o id fornecido
  };

  const handleExcluir = async (escolaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/api/v1/${escolaid}/`);
      const response = await api.get("/escolas/api/v1/");
      setEscolas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir escola");
      console.log("Erro ao excluir escola", error);
      setLoading(false);
    }
  };

  const handleAddEscola = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/api/v1/", {
        cnpj: cnpjEscola,
        nome: nomeEscola,
        endereco: enderecoEscola,
        descricao: descricaoEscola,
      });
      const response = await api.get("/escolas/api/v1/");
      setEscolas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar escola");
      console.log("Erro ao cadastrar escola", error);
      setLoading(false);
    }
    handleSetCadastrar(false);
  };

  const columns = [
    { Header: "cnpj", accessor: "cnpj", align: "left" },
    { Header: "nome", accessor: "nome", align: "left" },
    { Header: "num_salas", accessor: "num_salas", align: "center" },
    { Header: "quantidade_alunos", accessor: "quantidade_alunos", align: "center" },
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
                  Lista de Escolas
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <DataTable
                  table={{
                    columns,
                    rows: escolas.map((escola) => ({
                      cnpj: escola.cnpj,
                      nome: escola.nome,
                      num_salas: escola.num_salas,
                      quantidade_alunos: escola.quantidade_alunos,
                      opcoes: (
                        <Grid
                          container
                          spacing={2}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Grid item xs={12} sm={6} container>
                            <Link to={`/escola/${escola.id}`}>
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
                              onClick={() => handleExcluir(escola.id)}
                            >
                              Excluir
                            </MDButton>
                          </Grid>
                        </Grid>
                      ),
                    })),
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
            {cadastrar ? (
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
                    Cadastrar Nova Escola
                  </MDTypography>
                </MDBox>
                <Grid container spacing={3} mb={2}>
                  <Grid item xs={12} sm={12}>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDInput
                        type="number"
                        variant="outlined"
                        label="CNPJ"
                        value={cnpjEscola}
                        onChange={handleSetCnpjEscola}
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDInput
                        type="text"
                        variant="outlined"
                        label="Nome"
                        value={nomeEscola}
                        onChange={handleSetNomeEscola}
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDInput
                        type="text"
                        variant="outlined"
                        label="Endereço"
                        value={enderecoEscola}
                        onChange={handleSetEnderecoEscola}
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDInput
                        type="text"
                        variant="outlined"
                        label="Descrição"
                        value={descricaoEscola}
                        onChange={handleSetDescricaoEscola}
                        multiline
                        rows={3}
                        style={{ width: "100%" }}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="center" pt={2} px={2}>
                      <MDButton variant="contained" color="success" onClick={handleAddEscola}>
                        Cadastrar
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </Card>
            ) : (
              <MDBox></MDBox>
            )}
          </Grid>
          {!cadastrar ? (
            <Grid item xs={12} mt={6}>
              <Fab // Adicione o componente Fab para o botão flutuante
                color="success"
                aria-label="add"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
                onClick={() => handleSetCadastrar(true)}
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

export default Escolas;
