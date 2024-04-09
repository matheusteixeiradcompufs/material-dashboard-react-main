import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import Funcao from "../components/Funcao";
import MDInput from "components/MDInput";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

function AddFuncionarios() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [grupos, setGrupos] = useState([]);
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
  const [novoRetrato, setNovoRetrato] = useState(null);

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
    const fetchGrupos = async () => {
      try {
        const response = await api.get("/pessoas/usuario/grupo/api/v1/");
        setGrupos(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchGrupos();
        } else {
          toast.error("Erro ao carregar os cargos!");
          console.log("Erro ao carregar os cargos!", error);
        }
        setLoading(false);
      }
    };
    fetchGrupos();
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
      navigate("/pessoas/funcionarios");
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleSalvar();
      } else {
        toast.error("Erro ao cadastrar novo funcionario!");
        console.log("Erro ao cadastrar novo funcionario!", error);
      }
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setLoading(true);
    navigate("/pessoas/funcionarios");
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
      <DashboardNavbar />
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
                bgColor="success"
                borderRadius="lg"
                coloredShadow="success"
              >
                <MDTypography variant="h6" color="white">
                  Cadastrar Novo Funcionario
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2} mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDBox px={2} color="info" display="flex" justifyContent="center">
                      <Funcao value={grupo} onChange={handleSetGrupo} groups={grupos} />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Nome"
                      type="text"
                      value={nome}
                      onChange={handleSetNome}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Sobrenome"
                      type="text"
                      value={sobrenome}
                      onChange={handleSetSobrenome}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Email"
                      type="email"
                      value={email}
                      onChange={handleSetEmail}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput
                      label="Usuário"
                      type="text"
                      value={usuario}
                      onChange={handleSetUsuario}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput
                      label="Senha"
                      type="password"
                      value={senha}
                      onChange={handleSetSenha}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <MDInput
                      label="Matrícula"
                      type="text"
                      value={matricula}
                      onChange={handleSetMatricula}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <MDInput
                      label="CPF"
                      type="text"
                      value={cpf}
                      onChange={handleSetCpf}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <MDInput
                      label="Data"
                      type="date"
                      value={dataNascimento}
                      onChange={handleSetDataNascimento}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Endereço"
                      type="text"
                      multiline
                      rows={2}
                      value={endereco}
                      onChange={handleSetEndereco}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Fornação"
                      type="text"
                      multiline
                      rows={3}
                      value={formacao}
                      onChange={handleSetFormacao}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      type="file"
                      accept="image/png, image/jpg"
                      onChange={handleFile}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox mb={2} display="flex" flexDirection="row" justifyContent="center">
                <MDBox mr={1}>
                  <MDButton variant="gradient" color="success" onClick={handleSalvar}>
                    Salvar
                  </MDButton>
                </MDBox>
                <MDBox ml={1}>
                  <MDButton variant="gradient" color="error" onClick={handleCancelar}>
                    Cancelar
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AddFuncionarios;
