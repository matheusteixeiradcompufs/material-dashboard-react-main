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

function EscolaMurais() {
  const { escolaid } = useParams();
  const [escola, setEscola] = useState(true);
  const [mural, setMural] = useState(true);
  const [ano, setAno] = useState("");
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

  const handleSetAno = (e) => {
    setAno(e.target.value);
  };

  const handleOnListar = () => {
    setAno("");
    setMural(null);
    setAdd(false);
    setEditar(false);
    setView(false);
    setListar(true);
  };

  const handleOnView = (muralid) => {
    const muralView = escola.objetos_murais.find((objeto) => objeto.id === muralid);
    setMural(muralView);
    setAno(muralView.ano);
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
      await api.post("/escolas/mural/api/v1/", {
        ano: ano,
        escola: id,
      });
      const response = await api.get(`/escolas/api/v1/${escolaid}/`);
      setEscola(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar mural");
      console.log("Erro ao cadastrar mural", error);
      setLoading(false);
    }
  };

  const handleEditar = async (muralid) => {
    setLoading(true);
    try {
      await api.patch(`/escolas/mural/api/v1/${muralid}/`, {
        ano: ano,
      });
      const response = await api.get(`/escolas/api/v1/${escolaid}/`);
      setEscola(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao modificar escola");
      console.log("Erro ao modificar escola", error);
      setLoading(false);
    }
  };

  const handleExcluir = async (muralid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/mural/api/v1/${muralid}/`);
      const response = await api.get(`/escolas/api/v1/${escolaid}/`);
      setEscola(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir mural");
      console.log("Erro ao excluir mural", error);
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
                murais={escola?.objetos_murais}
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
                    mural={mural}
                    ano={ano}
                    handleSetAno={handleSetAno}
                    handleOnEditar={handleOnEditar}
                    handleOnListar={handleOnListar}
                  />
                </MDBox>
                <MDBox mt={6}>
                  <Menu escola={escola} muralid={mural.id} />
                </MDBox>
              </>
            ) : (
              <></>
            )}
            {editar ? (
              <Edit
                mural={mural}
                ano={ano}
                handleSetAno={handleSetAno}
                handleEditar={handleEditar}
                handleOnView={handleOnView}
              />
            ) : (
              <></>
            )}
            {add ? (
              <Add
                ano={ano}
                handleSetAno={handleSetAno}
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

export default EscolaMurais;
