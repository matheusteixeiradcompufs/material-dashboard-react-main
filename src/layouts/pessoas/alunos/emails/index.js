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

function AlunoEmails() {
  const { alunoid } = useParams();
  const [aluno, setAluno] = useState(true);
  const [email, setEmail] = useState(true);
  const [endereco, setEndereco] = useState("");
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

  const handleSetEndereco = (e) => {
    setEndereco(e.target.value);
  };

  const handleOnListar = () => {
    setEndereco("");
    setEmail(null);
    setAdd(false);
    setEditar(false);
    setView(false);
    setListar(true);
  };

  const handleOnView = (emailid) => {
    const emailView = aluno.objetos_emails.find((objeto) => objeto.id === emailid);
    setEmail(emailView);
    setEndereco(emailView.endereco);
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
      await api.post("/pessoas/email/api/v1/", {
        endereco: endereco,
        pessoa: alunoid,
      });
      const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
      setAluno(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar email");
      console.log("Erro ao cadastrar email", error);
      setLoading(false);
    }
  };

  const handleEditar = async (emailid) => {
    setLoading(true);
    try {
      await api.patch(`/pessoas/email/api/v1/${emailid}/`, {
        endereco: endereco,
      });
      const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
      setAluno(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar aluno");
      console.log("Erro ao cadastrar aluno", error);
      setLoading(false);
    }
  };

  const handleExcluir = async (emailid) => {
    setLoading(true);
    try {
      await api.delete(`/pessoas/email/api/v1/${emailid}/`);
      const response = await api.get(`/pessoas/aluno/api/v1/${alunoid}/`);
      setAluno(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir email");
      console.log("Erro ao excluir email", error);
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
                emails={aluno?.objetos_emails}
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
                    email={email}
                    endereco={endereco}
                    handleSetEndereco={handleSetEndereco}
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
                email={email}
                endereco={endereco}
                handleSetEndereco={handleSetEndereco}
                handleEditar={handleEditar}
                handleOnView={handleOnView}
              />
            ) : (
              <></>
            )}
            {add ? (
              <Add
                endereco={endereco}
                handleSetEndereco={handleSetEndereco}
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

export default AlunoEmails;
