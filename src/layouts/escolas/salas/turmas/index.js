import { Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import List from "./components/List";
import Add from "./components/Add";
import View from "./components/View";
import Edit from "./components/Edit";
import Menu from "./components/Menu";

function SalaTurmas() {
  const { salaid } = useParams();
  const [loading, setLoading] = useState(true);
  const [sala, setSala] = useState(null);
  const [turma, setTurma] = useState(null);
  const [listarTurma, setListarTurma] = useState(true);
  const [addTurma, setAddTurma] = useState(false);
  const [editarTurma, setEditarTurma] = useState(false);
  const [viewTurma, setViewTurma] = useState(false);
  const [nomeTurma, setNomeTurma] = useState("");
  const [selectedTurno, setSelectedTurno] = useState("M");
  const [anoTurma, setAnoTurma] = useState("");

  useEffect(() => {
    const fetchSala = async () => {
      try {
        const response = await api.get(`/escolas/sala/api/v1/${salaid}/`);
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

  const handleOnAdd = () => {
    setListarTurma(false);
    setEditarTurma(false);
    setViewTurma(false);
    setAddTurma(true);
  };

  const handleOnEditar = () => {
    setListarTurma(false);
    setViewTurma(false);
    setAddTurma(false);
    setEditarTurma(true);
  };

  const handleOnListar = () => {
    setTurma(null);
    setNomeTurma("");
    setSelectedTurno("M");
    setAnoTurma("");
    setEditarTurma(false);
    setViewTurma(false);
    setAddTurma(false);
    setListarTurma(true);
  };

  const handleOnView = (turmaid) => {
    const turmaView = sala?.objetos_turmas.find((objeto) => objeto.id === turmaid);
    setTurma(turmaView);
    setNomeTurma(turmaView.nome);
    setSelectedTurno(turmaView.turno);
    setAnoTurma(turmaView.ano);
    setEditarTurma(false);
    setAddTurma(false);
    setListarTurma(false);
    setViewTurma(true);
  };

  const handleSetNomeTurma = (nome) => {
    setNomeTurma(nome.target.value);
  };

  const handleTurnoChange = (turno) => {
    setSelectedTurno(turno.target.value);
  };

  const handleSetAnoTurma = (ano) => {
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
      const response = await api.get(`/escolas/sala/api/v1/${salaid}/`);
      setSala(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar nova turma!");
      console.log("Erro ao cadastrar nova turma!", error);
      setLoading(false);
    }
  };

  const handleEditar = async (turmaid) => {
    setLoading(true);
    try {
      await api.patch(`/escolas/sala/turma/api/v1/${turmaid}/`, {
        nome: nomeTurma,
        ano: anoTurma,
        turno: selectedTurno,
      });
      const response = await api.get(`/escolas/sala/api/v1/${salaid}/`);
      setSala(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao modificar turma!");
      console.log("Erro ao modificar turma!", error);
      setLoading(false);
    }
  };

  const handleExcluir = async (turmaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/sala/turma/api/v1/${turmaid}`);
      const response = await api.get(`/escolas/sala/api/v1/${salaid}`);
      setSala(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir a turma!");
      console.log("Erro ao excluir a turma!", error);
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
            {listarTurma ? (
              <List sala={sala} handleOnView={handleOnView} handleExcluir={handleExcluir} />
            ) : (
              <></>
            )}
            {addTurma ? (
              <Add
                nomeTurma={nomeTurma}
                handleSetNomeTurma={handleSetNomeTurma}
                selectedTurno={selectedTurno}
                handleTurnoChange={handleTurnoChange}
                anoTurma={anoTurma}
                handleSetAnoTurma={handleSetAnoTurma}
                handleAddTurma={handleAddTurma}
                handleOnListar={handleOnListar}
              />
            ) : (
              <></>
            )}
            {viewTurma ? (
              <>
                <MDBox>
                  <View
                    nomeTurma={nomeTurma}
                    handleSetNomeTurma={handleSetNomeTurma}
                    selectedTurno={selectedTurno}
                    handleTurnoChange={handleTurnoChange}
                    anoTurma={anoTurma}
                    handleSetAnoTurma={handleSetAnoTurma}
                    handleOnEditar={handleOnEditar}
                    handleOnListar={handleOnListar}
                  />
                </MDBox>
                <MDBox mt={6}>
                  <Menu escolaid={sala.escola} salaid={salaid} turmaid={turma.id} />
                </MDBox>
              </>
            ) : (
              <></>
            )}
            {editarTurma ? (
              <Edit
                turma={turma}
                nomeTurma={nomeTurma}
                handleSetNomeTurma={handleSetNomeTurma}
                selectedTurno={selectedTurno}
                handleTurnoChange={handleTurnoChange}
                anoTurma={anoTurma}
                handleSetAnoTurma={handleSetAnoTurma}
                handleEditar={handleEditar}
                handleOnView={handleOnView}
              />
            ) : (
              <></>
            )}
          </Grid>
          {listarTurma ? (
            <Grid item xs={12} mt={6}>
              <Fab
                color="success"
                aria-label="add"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
                onClick={handleOnAdd}
              >
                <AddIcon color="white" />
              </Fab>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default SalaTurmas;
