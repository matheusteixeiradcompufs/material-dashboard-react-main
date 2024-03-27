import React, { useEffect, useState } from "react";
import { Card, Grid, Select, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import notasTableData from "layouts/notas/data/notasTableData";
import notasAlunoTableData from "layouts/notas/data/notasAlunoTableData";
import { useParams } from "react-router-dom";
import MDButton from "components/MDButton";
import { api } from "services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Audio } from "react-loader-spinner";

function Notas() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("Selecione uma turma");
  const [turmas, setTurmas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurmas = async () => {
      setLoading(true);
      try {
        const username = "professor1";
        const response = await api.post("/pessoas/me/", { username });
        const { objetos_turmas } = await response.data;
        setTurmas(objetos_turmas);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar turmas");
        console.error("Erro ao carregar turmas:", error);
        setLoading(false);
        // Lidar com erros, se necessário
      }
    };
    fetchTurmas();
  }, []);

  const handleTurmaChange = (event) => {
    setSelectedTurma(event.target.value);
  };

  const handleCarregarBoletins = async () => {
    setLoading(true);
    try {
      const { colunas, linhas } = turmas
        ? await notasTableData(selectedTurma)
        : await notasTableData();
      setColumns(colunas);
      setRows(linhas);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao carregar notas");
      console.error("Erro ao carregar notas:", error);
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
                  Boletins de Aluno da Turma
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Select
                      value={selectedTurma}
                      onChange={handleTurmaChange}
                      style={{ width: "100%", height: 45 }}
                    >
                      <MenuItem value="Selecione uma turma">Selecione uma turma</MenuItem>
                      {turmas &&
                        turmas.map((turma, index) => (
                          <MenuItem key={index} value={turma}>
                            {turma.nome} em {turma.ano}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6} container justifyContent="flex-end">
                    <MDButton
                      variant="gradient"
                      color="secondary"
                      size="medium"
                      onClick={handleCarregarBoletins}
                    >
                      Carregar
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

function NotasAluno() {
  const { boletimid } = useParams();

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [medias, setMedias] = useState([]);
  const [situacoes, setSituacoes] = useState([]);

  const loadBoletim = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
      const { objetos_avaliacoes, objetos_medias, objetos_situacoes } = response.data;
      setAvaliacoes(objetos_avaliacoes);
      setMedias(objetos_medias);
      setSituacoes(objetos_situacoes);
      const { colunas, linhas } =
        objetos_avaliacoes && objetos_medias && objetos_situacoes
          ? await notasAlunoTableData(objetos_avaliacoes, objetos_medias, objetos_situacoes)
          : await notasAlunoTableData();
      setColumns(colunas);
      setRows(linhas);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao carregar boletim");
      console.error("Erro ao carregar boletim:", error);
      setLoading(false);
      // Lidar com erros, se necessário
    }
  };

  useEffect(() => {
    setLoading(true);
    loadBoletim();
    setLoading(false);
  }, [boletimid]);

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
            <Card mb={5}>
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
                  Notas do Aluno
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export { Notas, NotasAluno };
