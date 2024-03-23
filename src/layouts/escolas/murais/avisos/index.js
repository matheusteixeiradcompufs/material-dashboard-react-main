import { Fab, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import List from "./components/List";
import Detail from "./components/Detail";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Edit from "./components/Edit";
import Add from "./components/Add";

function MuralAvisos() {
  const { muralid } = useParams();
  const [loading, setLoading] = useState(true);
  const [avisos, setAvisos] = useState([]);
  const [aviso, setAviso] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [listarAvisos, setListarAvisos] = useState(true);
  const [viewAvisos, setViewAvisos] = useState(false);
  const [editarAvisos, setEditarAvisos] = useState(false);
  const [addAvisos, setAddAvisos] = useState(false);
  useEffect(() => {
    const fetchAvisos = async () => {
      try {
        let response = await api.get(`/escolas/mural/api/v1/${muralid}/`);
        setAvisos(response.data.objetos_avisos);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar avisos!");
        console.log("Erro ao carregar avisos!", error);
        setLoading(false);
      }
    };
    fetchAvisos();
  }, []);
  const handleOnListarAvisos = () => {
    setTitulo("");
    setTexto("");
    setViewAvisos(false);
    setEditarAvisos(false);
    setAddAvisos(false);
    setListarAvisos(true);
  };
  const handleOnViewAvisos = (avisoid) => {
    const avisoView = avisos.find((objeto) => objeto.id === avisoid);
    setTitulo(avisoView.titulo);
    setTexto(avisoView.texto);
    setAviso(avisoView);
    setListarAvisos(false);
    setEditarAvisos(false);
    setAddAvisos(false);
    setViewAvisos(true);
  };
  const handleOnEditarAvisos = () => {
    setViewAvisos(false);
    setListarAvisos(false);
    setAddAvisos(false);
    setEditarAvisos(true);
  };
  const handleOnAddAvisos = () => {
    setViewAvisos(false);
    setListarAvisos(false);
    setEditarAvisos(false);
    setAddAvisos(true);
  };
  const handleSetTitulo = (e) => {
    setTitulo(e.target.value);
  };
  const handleSetTexto = (e) => {
    setTexto(e.target.value);
  };
  const handleSalvar = async () => {
    setLoading(true);
    try {
      let response = await api.post("/escolas/mural/aviso/api/v1/", {
        titulo: titulo,
        texto: texto,
        mural: id,
      });
      response = await api.get(`/escolas/mural/api/v1/${muralid}/`);
      setAvisos(response.data.objetos_avisos);
      handleOnListarAvisos();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao salvar aviso!");
      console.log("Erro ao salvar aviso!", error);
      setLoading(false);
    }
  };
  const handleEditar = async (avisoid) => {
    setLoading(true);
    try {
      let response = await api.patch(`/escolas/mural/aviso/api/v1/${avisoid}/`, {
        titulo: titulo,
        texto: texto,
      });
      response = await api.get(`/escolas/mural/api/v1/${muralid}/`);
      setAvisos(response.data.objetos_avisos);
      handleOnListarAvisos();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao salvar aviso!");
      console.log("Erro ao salvar aviso!", error);
      setLoading(false);
    }
  };
  const handleExcluir = async (avisoid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/mural/aviso/api/v1/${avisoid}/`);
      const response = await api.get(`/escolas/mural/api/v1/${muralid}/`);
      setAvisos(response.data.objetos_avisos);
      handleOnListarAvisos();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir aviso!");
      console.log("Erro ao excluir aviso!", error);
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
            {listarAvisos ? (
              <List
                avisos={avisos}
                handleOnViewAvisos={handleOnViewAvisos}
                handleExcluir={handleExcluir}
              />
            ) : (
              <></>
            )}
            {viewAvisos ? (
              <Detail
                aviso={aviso}
                titulo={titulo}
                handleSetTitulo={handleSetTitulo}
                texto={texto}
                handleSetTexto={handleSetTexto}
                handleOnEditarAvisos={handleOnEditarAvisos}
                handleOnListarAvisos={handleOnListarAvisos}
              />
            ) : (
              <></>
            )}
            {editarAvisos ? (
              <Edit
                aviso={aviso}
                titulo={titulo}
                handleSetTitulo={handleSetTitulo}
                texto={texto}
                handleSetTexto={handleSetTexto}
                handleEditar={handleEditar}
                handleOnViewAvisos={handleOnViewAvisos}
              />
            ) : (
              <></>
            )}
            {addAvisos ? (
              <Add
                titulo={titulo}
                handleSetTitulo={handleSetTitulo}
                texto={texto}
                handleSetTexto={handleSetTexto}
                handleSalvar={handleSalvar}
                handleOnListarAvisos={handleOnListarAvisos}
              />
            ) : (
              <></>
            )}
          </Grid>
          {listarAvisos ? (
            <Grid item xs={12} mt={6}>
              <Fab
                color="success"
                aria-label="Add"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
                onClick={handleOnAddAvisos}
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

export default MuralAvisos;
