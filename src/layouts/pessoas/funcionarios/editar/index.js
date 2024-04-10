import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDTypography from "components/MDTypography";
import { Link, useNavigate, useParams } from "react-router-dom";
import MDButton from "components/MDButton";
import Funcao from "../components/Funcao";
import MDInput from "components/MDInput";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

function EditarFuncionario() {
  const { user, refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { funcionarioid } = useParams();
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
  const [retrato, setRetrato] = useState(null);
  const [novoRetrato, setNovoRetrato] = useState(null);

  useEffect(() => {
    const fetchFuncionario = async () => {
      try {
        let response = await api.get(`/pessoas/funcionario/api/v1/${funcionarioid}/`);
        const { objeto_usuario } = response.data;
        setGrupo(objeto_usuario.objetos_grupos[0].id);
        setNome(objeto_usuario.first_name);
        setSobrenome(objeto_usuario.last_name);
        setEmail(objeto_usuario.email);
        setUsuario(objeto_usuario.username);
        setSenha(objeto_usuario.password);
        setMatricula(response.data.matricula);
        setCpf(response.data.cpf);
        setDataNascimento(response.data.data_nascimento);
        setEndereco(response.data.endereco);
        setFormacao(response.data.formacao);
        setRetrato(response.data.retrato);
        response = await api.get("/pessoas/usuario/grupo/api/v1/");
        setGrupos(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchFuncionario();
        }
        toast.error("Erro ao carregar os funcionarios");
        console.log("Erro ao carregar os funcionarios", error);
        setLoading(false);
      }
    };
    fetchFuncionario();
  }, []);

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

  const handleEditar = async () => {
    setLoading(true);
    try {
      let response = await api.get(`/pessoas/funcionario/api/v1/${funcionarioid}/`);
      const { objeto_usuario } = response.data;
      response = await api.patch(`/pessoas/usuario/api/v1/${objeto_usuario.id}/`, {
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
      if (novoRetrato) {
        formData.append("retrato", novoRetrato);
      }
      response = await api.patch(`/pessoas/funcionario/api/v1/${funcionarioid}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/pessoas/funcionario/${funcionarioid}/view`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleEditar();
      } else {
        toast.error("Erro ao modificar funcionario!");
        console.log("Erro ao modificar funcionario!", error);
      }
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setLoading(true);
    navigate(`/pessoas/funcionario/${funcionarioid}/view`);
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
                bgColor="warning"
                borderRadius="lg"
                coloredShadow="warning"
              >
                <MDTypography variant="h6" color="white">
                  Editar Funcionario
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={2} mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDBox px={2} color="info" display="flex" justifyContent="center">
                      <Funcao
                        user={user}
                        value={`${grupo}`}
                        onChange={handleSetGrupo}
                        groups={grupos}
                      />
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
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput label="Senha" value={senha} type="password" fullWidth disabled />
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
                      label="Formação"
                      type="text"
                      multiline
                      rows={3}
                      value={formacao}
                      onChange={handleSetFormacao}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {retrato && (
                      <MDBox px={1} display="flex" flexDirection="row">
                        <MDTypography variant="h6" mr={1}>
                          Atualmente:
                        </MDTypography>
                        <Link href={retrato} underline="hover" variant="body2">
                          {retrato}
                        </Link>
                      </MDBox>
                    )}
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
                  <MDButton variant="gradient" color="success" onClick={handleEditar}>
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

export default EditarFuncionario;
