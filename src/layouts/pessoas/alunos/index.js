import { Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import List from "./components/List";
import View from "./components/View";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Menu from "./components/Menu";

function Alunos() {
  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState([]);
  const [aluno, setAluno] = useState(null);
  const [listarAlunos, setListarAlunos] = useState(true);
  const [viewAluno, setViewAluno] = useState(false);
  const [editarAluno, setEditarAluno] = useState(false);
  const [addAluno, setAddAluno] = useState(false);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState(null);
  const [endereco, setEndereco] = useState("");
  const [retrato, setRetrato] = useState(null);
  const [novoRetrato, setNovoRetrato] = useState(null);
  const handleOnListarAluno = () => {
    setNome("");
    setSobrenome("");
    setEmail("");
    setUsuario("");
    setSenha("");
    setMatricula("");
    setCpf("");
    setDataNascimento(null);
    setEndereco("");
    setRetrato(null);
    setAluno(null);
    setViewAluno(false);
    setEditarAluno(false);
    setAddAluno(false);
    setListarAlunos(true);
  };
  const handleOnViewAluno = (alunoid) => {
    const alunoView = alunos.find((objeto) => objeto.id === alunoid);
    setAluno(alunoView);
    setNome(alunoView.objeto_usuario.first_name);
    setSobrenome(alunoView.objeto_usuario.last_name);
    setEmail(alunoView.objeto_usuario.email);
    setUsuario(alunoView.objeto_usuario.username);
    setSenha(alunoView.objeto_usuario.password);
    setMatricula(alunoView.matricula);
    setCpf(alunoView.cpf);
    setDataNascimento(alunoView.data_nascimento);
    setEndereco(alunoView.endereco);
    setRetrato(alunoView.retrato);
    setListarAlunos(false);
    setEditarAluno(false);
    setAddAluno(false);
    setViewAluno(true);
  };
  const handleOnEditarAluno = () => {
    setListarAlunos(false);
    setViewAluno(false);
    setAddAluno(false);
    setEditarAluno(true);
  };
  const handleOnAddAluno = () => {
    setListarAlunos(false);
    setViewAluno(false);
    setEditarAluno(false);
    setAddAluno(true);
  };
  const handleSetNome = (e) => {
    setNome(e.target.value);
  };
  const handleSetSobrenome = (e) => {
    setSobrenome(e.target.value);
  };
  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSetUsuario = (e) => {
    setUsuario(e.target.value);
  };
  const handleSetSenha = (e) => {
    setSenha(e.target.value);
  };
  const handleSetMatricula = (e) => {
    setMatricula(e.target.value);
  };
  const handleSetCpf = (e) => {
    setCpf(e.target.value);
  };
  const handleSetDataNascimento = (date) => {
    setDataNascimento(date.target.value);
  };
  const handleSetEndereco = (e) => {
    setEndereco(e.target.value);
  };
  const handleFile = (e) => {
    if (!e.target.files) {
      return;
    }
    const image = e.target.files[0];
    if (!image) {
      return;
    }
    if (image.type === "image/jpeg" || image.type === "image/png") {
      setRetrato(image);
    }
  };
  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.get("/pessoas/aluno/api/v1/");
        setAlunos(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar os alunos");
        console.log("Erro ao carregar os alunos", error);
        setLoading(false);
      }
    };
    fetchAlunos();
  }, []);
  const handleSalvar = async () => {
    setLoading(true);
    try {
      let response = await api.post("/pessoas/usuario/api/v1/", {
        first_name: nome,
        last_name: sobrenome,
        username: usuario,
        email: email,
        password: senha,
      });
      const formData = new FormData();
      formData.append("matricula", matricula);
      formData.append("cpf", cpf);
      formData.append("data_nascimento", dataNascimento);
      formData.append("endereco", endereco);
      formData.append("usuario", response.data.id);
      formData.append("retrato", novoRetrato);

      response = await api.post("/pessoas/aluno/api/v1/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      response = await api.get("/pessoas/aluno/api/v1/");
      setAlunos(response.data);
      handleOnListarAluno();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar novo aluno!");
      console.log("Erro ao cadastrar novo aluno!", error);
      setLoading(false);
    }
  };
  const handleEditar = async () => {
    setLoading(true);
    try {
      let response = await api.patch(`/pessoas/usuario/api/v1/${aluno.objeto_usuario.id}/`, {
        first_name: nome,
        last_name: sobrenome,
        email: email,
      });
      const formData = new FormData();
      formData.append("matricula", matricula);
      formData.append("cpf", cpf);
      formData.append("data_nascimento", dataNascimento);
      formData.append("endereco", endereco);
      formData.append("usuario", response.data.id);
      if (retrato) {
        formData.append("retrato", novoRetrato);
      }

      response = await api.patch(`/pessoas/aluno/api/v1/${aluno.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      response = await api.get("/pessoas/aluno/api/v1/");
      setAlunos(response.data);
      handleOnListarAluno();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao modificar aluno!");
      console.log("Erro ao modificar aluno!", error);
      setLoading(false);
    }
  };
  const handleExcluir = async (alunoid) => {
    setLoading(true);
    try {
      let response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
      const { objeto_usuario } = response.data;
      await api.delete(`/pessoas/aluno/api/v1/${alunoid}/`);
      await api.delete(`/pessoas/usuario/api/v1/${objeto_usuario.id}/`);
      response = await api.get("/pessoas/aluno/api/v1/");
      setAlunos(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao modificar aluno!");
      console.log("Erro ao modificar aluno!", error);
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
            {listarAlunos ? (
              <List
                alunos={alunos}
                handleOnViewAluno={handleOnViewAluno}
                handleExcluir={handleExcluir}
              />
            ) : (
              <></>
            )}
            {viewAluno ? (
              <>
                <MDBox>
                  <View
                    nome={nome}
                    sobrenome={sobrenome}
                    email={email}
                    usuario={usuario}
                    matricula={matricula}
                    cpf={cpf}
                    dataNascimento={dataNascimento}
                    endereco={endereco}
                    retrato={retrato}
                    handleSetNome={handleSetNome}
                    handleSetSobrenome={handleSetSobrenome}
                    handleSetEmail={handleSetEmail}
                    handleSetUsuario={handleSetUsuario}
                    handleSetMatricula={handleSetMatricula}
                    handleSetCpf={handleSetCpf}
                    handleSetDataNascimento={handleSetDataNascimento}
                    handleSetEndereco={handleSetEndereco}
                    handleFile={handleFile}
                    handleOnEditarAluno={handleOnEditarAluno}
                    handleOnListarAluno={handleOnListarAluno}
                  />
                </MDBox>
                <MDBox mt={6}>
                  <Menu aluno={aluno} />
                </MDBox>
              </>
            ) : (
              <></>
            )}
            {addAluno ? (
              <Add
                nome={nome}
                sobrenome={sobrenome}
                email={email}
                usuario={usuario}
                senha={senha}
                matricula={matricula}
                cpf={cpf}
                dataNascimento={dataNascimento}
                endereco={endereco}
                handleSetNome={handleSetNome}
                handleSetSobrenome={handleSetSobrenome}
                handleSetEmail={handleSetEmail}
                handleSetUsuario={handleSetUsuario}
                handleSetSenha={handleSetSenha}
                handleSetMatricula={handleSetMatricula}
                handleSetCpf={handleSetCpf}
                handleSetDataNascimento={handleSetDataNascimento}
                handleSetEndereco={handleSetEndereco}
                handleFile={handleFile}
                handleSalvar={handleSalvar}
                handleOnListarAluno={handleOnListarAluno}
              />
            ) : (
              <></>
            )}
            {editarAluno ? (
              <Edit
                aluno={aluno}
                nome={nome}
                sobrenome={sobrenome}
                email={email}
                usuario={usuario}
                matricula={matricula}
                cpf={cpf}
                dataNascimento={dataNascimento}
                endereco={endereco}
                retrato={retrato}
                handleSetNome={handleSetNome}
                handleSetSobrenome={handleSetSobrenome}
                handleSetEmail={handleSetEmail}
                handleSetUsuario={handleSetUsuario}
                handleSetMatricula={handleSetMatricula}
                handleSetCpf={handleSetCpf}
                handleSetDataNascimento={handleSetDataNascimento}
                handleSetEndereco={handleSetEndereco}
                handleFile={handleFile}
                handleEditar={handleEditar}
                handleOnViewAluno={handleOnViewAluno}
              />
            ) : (
              <></>
            )}
          </Grid>
          {listarAlunos ? (
            <Grid item xs={12} mt={6}>
              <Fab
                color="success"
                aria-label="add"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
                onClick={handleOnAddAluno}
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

export default Alunos;
