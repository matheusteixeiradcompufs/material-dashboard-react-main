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

function EscolaSalas() {
  const { escolaid } = useParams();
  const [escola, setEscola] = useState(true);
  const [sala, setSala] = useState(true);
  const [numero, setNumero] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [listar, setListar] = useState(true);
  const [editar, setEditar] = useState(false);
  const [view, setView] = useState(false);

  useEffect(() => {
    const fetchEscola = async () => {
      try {
        const response = await api.get(`/escolas/api/v1/${escolaid}/`);
        setEscola(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar escola");
        console.error("Erro ao carregar escola:", error);
        setLoading(false);
      }
    };
    fetchEscola();
  }, []);

  const handleSetNumero = (e) => {
    setNumero(e.target.value);
  };

  const handleSetQuantidade = (e) => {
    setQuantidade(e.target.value);
  };

  const handleOnListar = () => {
    setNumero("");
    setQuantidade("");
    setSala(null);
    setAdd(false);
    setEditar(false);
    setView(false);
    setListar(true);
  };

  const handleOnView = (salaid) => {
    const salaView = escola.objetos_salas.find((objeto) => objeto.id === salaid);
    setSala(salaView);
    setNumero(salaView.numero);
    setQuantidade(salaView.quantidade_alunos);
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
      await api.post("/escolas/sala/api/v1/", {
        numero: numero,
        quantidade_alunos: quantidade,
        escola: id,
      });
      const response = await api.get(`/escolas/api/v1/${escolaid}/`);
      setEscola(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar sala");
      console.log("Erro ao cadastrar sala", error);
      setLoading(false);
    }
  };

  const handleEditar = async (salaid) => {
    setLoading(true);
    try {
      await api.patch(`/escolas/sala/api/v1/${salaid}/`, {
        numero: numero,
        quantidade_alunos: quantidade,
      });
      const response = await api.get(`/escolas/api/v1/${escolaid}/`);
      setEscola(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar escola");
      console.log("Erro ao cadastrar escola", error);
      setLoading(false);
    }
  };

  const handleExcluir = async (salaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/sala/api/v1/${salaid}/`);
      const response = await api.get(`/escolas/api/v1/${escolaid}/`);
      setEscola(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir sala");
      console.log("Erro ao excluir sala", error);
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
                salas={escola?.objetos_salas}
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
                    sala={sala}
                    numero={numero}
                    quantidade={quantidade}
                    handleSetNumero={handleSetNumero}
                    handleSetQuantidade={handleSetQuantidade}
                    handleOnEditar={handleOnEditar}
                    handleOnListar={handleOnListar}
                  />
                </MDBox>
                <MDBox mt={6}>
                  <Menu escola={escola} salaid={sala.id} />
                </MDBox>
              </>
            ) : (
              <></>
            )}
            {editar ? (
              <Edit
                sala={sala}
                numero={numero}
                quantidade={quantidade}
                handleSetNumero={handleSetNumero}
                handleSetQuantidade={handleSetQuantidade}
                handleEditar={handleEditar}
                handleOnView={handleOnView}
              />
            ) : (
              <></>
            )}
            {add ? (
              <Add
                numero={numero}
                quantidade={quantidade}
                handleSetNumero={handleSetNumero}
                handleSetQuantidade={handleSetQuantidade}
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

export default EscolaSalas;
