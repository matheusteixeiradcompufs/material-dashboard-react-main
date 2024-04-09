import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

// Overview page components
import Header from "layouts/perfil/components/Header";
import DadosPessoais from "layouts/perfil/components/DadosPessoais";
import DadosInstitucionais from "layouts/perfil/components/DadosInstitucionais";
import Contatos from "layouts/perfil/components/Contatos";

import { useContext, useEffect, useState } from "react";
import { api } from "services/apiClient";
import { AuthContext } from "context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { Audio } from "react-loader-spinner";

function Overview() {
  const { user, refreshToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [pessoa, setPessoa] = useState(null);

  useEffect(() => {
    const fetchPessoa = async () => {
      try {
        const response = await api.post("/pessoas/me/", {
          username: user.username,
        });
        setPessoa(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchPessoa();
        } else {
          toast.error("Erro ao carregar dados do perfil!");
          console.log("Erro ao carregar dados do perfil!", error);
          setLoading(false);
        }
      }
    };
    fetchPessoa();
  }, []);

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
      <MDBox mb={2} />
      <Header
        portrait={pessoa.retrato}
        name={`${pessoa.objeto_usuario.first_name} ${pessoa.objeto_usuario.last_name}`}
        cargo={pessoa.objeto_usuario.objetos_grupos[0].name}
      >
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <DadosPessoais
                cpf={pessoa.cpf}
                dataNascimento={pessoa.data_nascimento}
                endereco={pessoa.endereco}
                formacao={pessoa.formacao}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <DadosInstitucionais
                matricula={pessoa.matricula}
                username={pessoa.objeto_usuario.username}
                email={pessoa.objeto_usuario.email}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <Contatos telefones={pessoa.objetos_telefones} emails={pessoa.objetos_emails} />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
