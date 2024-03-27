import { Card, Fab, Grid } from "@mui/material";
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
import MDTypography from "components/MDTypography";

function Funcionarios() {
  const [loading, setLoading] = useState(true);
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionario, setFuncionario] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [listarFuncionarios, setListarFuncionarios] = useState(true);
  const [viewFuncionario, setViewFuncionario] = useState(false);
  const [editarFuncionario, setEditarFuncionario] = useState(false);
  const [addFuncionario, setAddFuncionario] = useState(false);
  const [grupo, setGrupo] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState(null);
  const [endereco, setEndereco] = useState("");
  const [formacao, setFormacao] = useState("");
  const [retrato, setRetrato] = useState(null);
  const [novoRetrato, setNovoRetrato] = useState(null);
  const handleOnListarFuncionario = () => {
    setGrupo("");
    setNome("");
    setSobrenome("");
    setEmail("");
    setUsuario("");
    setSenha("");
    setMatricula("");
    setCpf("");
    setDataNascimento(null);
    setEndereco("");
    setFormacao("");
    setRetrato(null);
    setFuncionario(null);
    setViewFuncionario(false);
    setEditarFuncionario(false);
    setAddFuncionario(false);
    setListarFuncionarios(true);
  };
  const handleOnViewFuncionario = (funcionarioid) => {
    const funcionarioView = funcionarios.find((objeto) => objeto.id === funcionarioid);
    setFuncionario(funcionarioView);
    setGrupo(funcionarioView.objeto_usuario.groups[0]);
    setNome(funcionarioView.objeto_usuario.first_name);
    setSobrenome(funcionarioView.objeto_usuario.last_name);
    setEmail(funcionarioView.objeto_usuario.email);
    setUsuario(funcionarioView.objeto_usuario.username);
    setSenha(funcionarioView.objeto_usuario.password);
    setMatricula(funcionarioView.matricula);
    setCpf(funcionarioView.cpf);
    setDataNascimento(funcionarioView.data_nascimento);
    setEndereco(funcionarioView.endereco);
    setFormacao(funcionarioView.formacao);
    setRetrato(funcionarioView.retrato);
    setListarFuncionarios(false);
    setEditarFuncionario(false);
    setAddFuncionario(false);
    setViewFuncionario(true);
  };
  const handleOnEditarFuncionario = () => {
    setListarFuncionarios(false);
    setViewFuncionario(false);
    setAddFuncionario(false);
    setEditarFuncionario(true);
  };
  const handleOnAddFuncionario = () => {
    setListarFuncionarios(false);
    setViewFuncionario(false);
    setEditarFuncionario(false);
    setAddFuncionario(true);
  };
  const handleSetGrupo = (e) => {
    setGrupo(e.target.value);
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
  const handleSetFormacao = (e) => {
    setFormacao(e.target.value);
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
      setNovoRetrato(image);
    }
  };
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        let response = await api.get("/pessoas/funcionario/api/v1/");
        setFuncionarios(response.data);
        response = await api.get("/pessoas/usuario/grupo/api/v1/");
        setGrupos(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar os funcionarios");
        console.log("Erro ao carregar os funcionarios", error);
        setLoading(false);
      }
    };
    fetchFuncionarios();
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
        groups: [grupo],
      });
      const formData = new FormData();
      formData.append("matricula", matricula);
      formData.append("cpf", cpf);
      formData.append("data_nascimento", dataNascimento);
      formData.append("endereco", endereco);
      formData.append("formacao", formacao);
      formData.append("usuario", response.data.id);
      formData.append("retrato", novoRetrato);

      response = await api.post("/pessoas/funcionario/api/v1/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      response = await api.get("/pessoas/funcionario/api/v1/");
      setFuncionarios(response.data);
      handleOnListarFuncionario();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar novo funcionario!");
      console.log("Erro ao cadastrar novo funcionario!", error);
      setLoading(false);
    }
  };
  const handleEditar = async () => {
    setLoading(true);
    try {
      let response = await api.patch(`/pessoas/usuario/api/v1/${funcionario.objeto_usuario.id}/`, {
        first_name: nome,
        last_name: sobrenome,
        email: email,
        groups: [grupo],
      });
      const formData = new FormData();
      formData.append("matricula", matricula);
      formData.append("cpf", cpf);
      formData.append("data_nascimento", dataNascimento);
      formData.append("endereco", endereco);
      formData.append("formacao", formacao);
      formData.append("usuario", response.data.id);
      if (retrato) {
        formData.append("retrato", novoRetrato);
      }

      response = await api.patch(`/pessoas/funcionario/api/v1/${funcionario.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      response = await api.get("/pessoas/funcionario/api/v1/");
      setFuncionarios(response.data);
      handleOnListarFuncionario();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao modificar funcionario!");
      console.log("Erro ao modificar funcionario!", error);
      setLoading(false);
    }
  };
  const handleExcluir = async (funcionarioid) => {
    setLoading(true);
    try {
      let response = await api.get(`/pessoas/funcionario/api/v1/${funcionarioid}/`);
      const { objeto_usuario } = response.data;
      await api.delete(`/pessoas/funcionario/api/v1/${funcionarioid}/`);
      await api.delete(`/pessoas/usuario/api/v1/${objeto_usuario.id}/`);
      response = await api.get("/pessoas/funcionario/api/v1/");
      setFuncionarios(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao modificar funcionario!");
      console.log("Erro ao modificar funcionario!", error);
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
          {listarFuncionarios ? (
            <Grid item xs={12}>
              <List
                funcionarios={funcionarios}
                handleOnViewFuncionario={handleOnViewFuncionario}
                handleExcluir={handleExcluir}
              />
            </Grid>
          ) : (
            <></>
          )}
          {viewFuncionario ? (
            <Grid item xs={12}>
              <View
                grupos={grupos}
                grupo={grupo}
                nome={nome}
                sobrenome={sobrenome}
                email={email}
                usuario={usuario}
                matricula={matricula}
                cpf={cpf}
                dataNascimento={dataNascimento}
                endereco={endereco}
                formacao={formacao}
                retrato={retrato}
                handleSetGrupo={handleSetGrupo}
                handleSetNome={handleSetNome}
                handleSetSobrenome={handleSetSobrenome}
                handleSetEmail={handleSetEmail}
                handleSetUsuario={handleSetUsuario}
                handleSetMatricula={handleSetMatricula}
                handleSetCpf={handleSetCpf}
                handleSetDataNascimento={handleSetDataNascimento}
                handleSetEndereco={handleSetEndereco}
                handleSetFormacao={handleSetFormacao}
                handleFile={handleFile}
                handleOnEditarFuncionario={handleOnEditarFuncionario}
                handleOnListarFuncionario={handleOnListarFuncionario}
              />
              <MDBox mt={6}>
                <Card>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="primary"
                    borderRadius="lg"
                    coloredShadow="primary"
                  >
                    <MDTypography variant="h6" color="white">
                      Gerenciar
                    </MDTypography>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          ) : (
            <></>
          )}
          {addFuncionario ? (
            <Grid item xs={12}>
              <Add
                grupos={grupos}
                grupo={grupo}
                nome={nome}
                sobrenome={sobrenome}
                email={email}
                usuario={usuario}
                senha={senha}
                matricula={matricula}
                cpf={cpf}
                dataNascimento={dataNascimento}
                endereco={endereco}
                formacao={formacao}
                handleSetGrupo={handleSetGrupo}
                handleSetNome={handleSetNome}
                handleSetSobrenome={handleSetSobrenome}
                handleSetEmail={handleSetEmail}
                handleSetUsuario={handleSetUsuario}
                handleSetSenha={handleSetSenha}
                handleSetMatricula={handleSetMatricula}
                handleSetCpf={handleSetCpf}
                handleSetDataNascimento={handleSetDataNascimento}
                handleSetEndereco={handleSetEndereco}
                handleSetFormacao={handleSetFormacao}
                handleFile={handleFile}
                handleSalvar={handleSalvar}
                handleOnListarFuncionario={handleOnListarFuncionario}
              />
            </Grid>
          ) : (
            <></>
          )}
          {editarFuncionario ? (
            <Grid item xs={12}>
              <Edit
                funcionario={funcionario}
                grupos={grupos}
                grupo={grupo}
                nome={nome}
                sobrenome={sobrenome}
                email={email}
                usuario={usuario}
                matricula={matricula}
                cpf={cpf}
                dataNascimento={dataNascimento}
                endereco={endereco}
                formacao={formacao}
                retrato={retrato}
                handleSetGrupo={handleSetGrupo}
                handleSetNome={handleSetNome}
                handleSetSobrenome={handleSetSobrenome}
                handleSetEmail={handleSetEmail}
                handleSetUsuario={handleSetUsuario}
                handleSetMatricula={handleSetMatricula}
                handleSetCpf={handleSetCpf}
                handleSetDataNascimento={handleSetDataNascimento}
                handleSetEndereco={handleSetEndereco}
                handleSetFormacao={handleSetFormacao}
                handleFile={handleFile}
                handleEditar={handleEditar}
                handleOnListarFuncionario={handleOnListarFuncionario}
              />
            </Grid>
          ) : (
            <></>
          )}
          {listarFuncionarios ? (
            <Grid item xs={12} mt={6}>
              <Fab
                color="success"
                aria-label="add"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
                onClick={handleOnAddFuncionario}
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

export default Funcionarios;
