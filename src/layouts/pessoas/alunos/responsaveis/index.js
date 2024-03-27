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

function AlunoResponsaveis() {
  const { alunoid } = useParams();
  const [aluno, setAluno] = useState(true);
  const [responsavel, setResponsavel] = useState(true);
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [observacao, setObservacao] = useState("");
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [listar, setListar] = useState(true);
  const [editar, setEditar] = useState(false);
  const [view, setView] = useState(false);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
        setAluno(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar aluno");
        console.error("Erro ao carregar aluno:", error);
        setLoading(false);
      }
    };
    fetchAluno();
  }, []);

  const handleSetCpf = (e) => {
    setCpf(e.target.value);
  };

  const handleSetNome = (e) => {
    setNome(e.target.value);
  };

  const handleSetObservacao = (e) => {
    setObservacao(e.target.value);
  };

  const handleOnListar = () => {
    setCpf("");
    setNome("");
    setObservacao("");
    setResponsavel(null);
    setAdd(false);
    setEditar(false);
    setView(false);
    setListar(true);
  };

  const handleOnView = (emailid) => {
    const responsavelView = aluno.objetos_responsaveis.find((objeto) => objeto.id === emailid);
    setResponsavel(responsavelView);
    setCpf(responsavelView.cpf);
    setNome(responsavelView.nome);
    setObservacao(responsavelView.observacao);
    setAdd(false);
    setEditar(false);
    setListar(false);
    setView(true);
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
      await api.post("/pessoas/aluno/responsavel/api/v1/", {
        cpf: cpf,
        nome: nome,
        observacao: observacao,
        aluno: alunoid,
      });
      const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
      setAluno(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar responsável");
      console.log("Erro ao cadastrar responsável", error);
      setLoading(false);
    }
  };

  const handleEditar = async (responsavelid) => {
    setLoading(true);
    try {
      await api.patch(`/pessoas/aluno/responsavel/api/v1/${responsavelid}/`, {
        cpf: cpf,
        nome: nome,
        observacao: observacao,
      });
      const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
      setAluno(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao modificar responsável");
      console.log("Erro ao modificar responsável", error);
      setLoading(false);
    }
  };

  const handleExcluir = async (responsavelid) => {
    setLoading(true);
    try {
      await api.delete(`/pessoas/aluno/responsavel/api/v1/${responsavelid}/`);
      const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
      setAluno(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir responsável");
      console.log("Erro ao excluir responsável", error);
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
            {listar ? (
              <List
                responsaveis={aluno?.objetos_responsaveis}
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
                    responsavel={responsavel}
                    cpf={cpf}
                    handleSetCpf={handleSetCpf}
                    nome={nome}
                    handleSetNome={handleSetNome}
                    observacao={observacao}
                    handleSetObservacao={handleSetObservacao}
                    handleOnEditar={handleOnEditar}
                    handleOnListar={handleOnListar}
                  />
                </MDBox>
              </>
            ) : (
              <></>
            )}
            {editar ? (
              <Edit
                responsavel={responsavel}
                cpf={cpf}
                handleSetCpf={handleSetCpf}
                nome={nome}
                handleSetNome={handleSetNome}
                observacao={observacao}
                handleSetObservacao={handleSetObservacao}
                handleEditar={handleEditar}
                handleOnView={handleOnView}
              />
            ) : (
              <></>
            )}
            {add ? (
              <Add
                cpf={cpf}
                handleSetCpf={handleSetCpf}
                nome={nome}
                handleSetNome={handleSetNome}
                observacao={observacao}
                handleSetObservacao={handleSetObservacao}
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

export default AlunoResponsaveis;
