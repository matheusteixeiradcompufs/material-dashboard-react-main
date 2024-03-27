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
import View from "./components/View";
import Edit from "./components/Edit";
import Add from "./components/Add";
import Menu from "./components/Menu";

function AlunoBoletins() {
  const { alunoid } = useParams();
  const [aluno, setAluno] = useState(true);
  const [boletim, setBoletim] = useState(null);
  const [escolas, setEscolas] = useState([]);
  const [salas, setSalas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedEscola, setSelectedEscola] = useState("");
  const [selectedSala, setSelectedSala] = useState("");
  const [selectedTurma, setSelectedTurma] = useState("");
  const [encerrar, setEncerrar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [listar, setListar] = useState(true);
  const [editar, setEditar] = useState(false);
  const [view, setView] = useState(false);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        let response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
        setAluno(response.data);
        response = await api.get("/escolas/api/v1/");
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
  const getTurno = (turno) => {
    let response;
    switch (turno) {
      case "M":
        response = "Manhã";
        break;
      case "T":
        response = "Tarde";
        break;
      case "N":
        response = "Noite";
        break;
      default:
        response = "";
        break;
    }
    return response;
  };
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

  const handleChangeEncerrar = () => {
    setEncerrar(!encerrar);
  };

  const handleOnListar = () => {
    setSalas([]);
    setTurmas([]);
    setSelectedEscola("");
    setSelectedSala("");
    setSelectedTurma("");
    setAdd(false);
    setEditar(false);
    setView(false);
    setListar(true);
  };

  const handleOnView = async (boletimid) => {
    setLoading(true);
    const boletimView = aluno.objetos_boletins.find((objeto) => objeto.id === boletimid);
    setBoletim(boletimView);
    setEncerrar(boletimView.encerrar);
    try {
      let response = await api.get(`/escolas/sala/turma/api/v1/${boletimView.turma}/`);
      setSelectedTurma(response.data.id);
      response = await api.get(`/escolas/sala/api/v1/${response.data.sala}/`);
      setTurmas(response.data.objetos_turmas);
      setSelectedSala(response.data.id);
      const escolaView = escolas.find((objeto) => objeto.id === response.data.escola);
      setSalas(escolaView.objetos_salas);
      setSelectedEscola(response.data.escola);
      setAdd(false);
      setEditar(false);
      setListar(false);
      setView(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleOnEditar = () => {
    setAdd(false);
    setView(false);
    setListar(false);
    setEditar(true);
  };

  const handleOnAdd = () => {
    setEditar(false);
    setView(false);
    setListar(false);
    setAdd(true);
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/pessoas/aluno/boletim/api/v1/", {
        turma: selectedTurma,
        aluno: alunoid,
      });
      const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
      setAluno(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao matricular aluno na turma");
      console.log("Erro ao matricular aluno na turma", error);
      setLoading(false);
    }
  };

  const handleEditar = async (boletimid) => {
    setLoading(true);
    try {
      await api.patch(`/pessoas/aluno/boletim/api/v1/${boletimid}/`, {
        turma: selectedTurma,
        encerrar: encerrar,
      });
      const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
      setAluno(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao modificar matricula do aluno");
      console.log("Erro ao modificar matricula do aluno", error);
      setLoading(false);
    }
  };

  const handleExcluir = async (boletimid) => {
    setLoading(true);
    try {
      await api.delete(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
      const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
      setAluno(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir matrícula do aluno");
      console.log("Erro ao excluir matrícula do aluno", error);
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
            {listar ? (
              <List
                boletins={aluno?.objetos_boletins}
                getTurno={getTurno}
                handleOnView={handleOnView}
                handleExcluir={handleExcluir}
              />
            ) : (
              <></>
            )}
            {view ? (
              <>
                <MDBox>
                  <View
                    boletim={boletim}
                    escolas={escolas}
                    salas={salas}
                    turmas={turmas}
                    selectedEscola={selectedEscola}
                    handleChangeEscola={handleChangeEscola}
                    selectedSala={selectedSala}
                    handleChangeSala={handleChangeSala}
                    selectedTurma={selectedTurma}
                    handleChangeTurma={handleChangeTurma}
                    handleOnEditar={handleOnEditar}
                    handleOnListar={handleOnListar}
                  />
                </MDBox>
                <MDBox mt={6}>
                  <Menu alunoid={alunoid} boletimid={boletim.id} />
                </MDBox>
              </>
            ) : (
              <></>
            )}
            {editar ? (
              <Edit
                boletim={boletim}
                escolas={escolas}
                salas={salas}
                turmas={turmas}
                encerrar={encerrar}
                handleChangeEncerrar={handleChangeEncerrar}
                selectedEscola={selectedEscola}
                handleChangeEscola={handleChangeEscola}
                selectedSala={selectedSala}
                handleChangeSala={handleChangeSala}
                selectedTurma={selectedTurma}
                handleChangeTurma={handleChangeTurma}
                handleEditar={handleEditar}
                handleOnView={handleOnView}
              />
            ) : (
              <></>
            )}
            {add ? (
              <Add
                escolas={escolas}
                salas={salas}
                turmas={turmas}
                selectedEscola={selectedEscola}
                handleChangeEscola={handleChangeEscola}
                selectedSala={selectedSala}
                handleChangeSala={handleChangeSala}
                selectedTurma={selectedTurma}
                handleChangeTurma={handleChangeTurma}
                handleAdd={handleAdd}
                handleOnListar={handleOnListar}
              />
            ) : (
              <></>
            )}
          </Grid>
          {listar ? (
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

export default AlunoBoletins;
