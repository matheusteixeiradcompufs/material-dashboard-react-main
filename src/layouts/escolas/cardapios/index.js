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

function EscolaCardapios() {
  const { escolaid } = useParams();
  const [escola, setEscola] = useState(true);
  const [cardapio, setCardapio] = useState(true);
  const [data, setData] = useState("");
  const [turno, setTurno] = useState("M");
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

  const handleSetData = (e) => {
    setData(e.target.value);
  };
  const handleSetTurno = (e) => {
    setTurno(e.target.value);
  };

  const handleOnListar = () => {
    setData(null);
    setTurno("M");
    setCardapio(null);
    setAdd(false);
    setEditar(false);
    setView(false);
    setListar(true);
  };

  const handleOnView = (cardapioid) => {
    const cardapioView = escola.objetos_cardapios.find((objeto) => objeto.id === cardapioid);
    setCardapio(cardapioView);
    setData(cardapioView.data);
    setTurno(cardapioView.turno);
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
      await api.post("/escolas/cardapio/api/v1/", {
        data: data,
        turno: turno,
        escola: id,
      });
      const response = await api.get(`/escolas/api/v1/${escolaid}/`);
      setEscola(response.data);
      handleOnListar();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar cardapio");
      console.log("Erro ao cadastrar cardapio", error);
      setLoading(false);
    }
  };

  const handleEditar = async (cardapioid) => {
    setLoading(true);
    try {
      await api.patch(`/escolas/cardapio/api/v1/${cardapioid}/`, {
        data: data,
        turno: turno,
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

  const handleExcluir = async (cardapioid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/cardapio/api/v1/${cardapioid}/`);
      const response = await api.get(`/escolas/api/v1/${escolaid}/`);
      setEscola(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir cardapio");
      console.log("Erro ao excluir cardapio", error);
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
                cardapios={escola?.objetos_cardapios}
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
                    cardapio={cardapio}
                    data={data}
                    turno={turno}
                    handleSetData={handleSetData}
                    handleSetTurno={handleSetTurno}
                    handleOnEditar={handleOnEditar}
                    handleOnListar={handleOnListar}
                  />
                </MDBox>
                <MDBox mt={6}>
                  <Menu escola={escola} cardapioid={cardapio.id} />
                </MDBox>
              </>
            ) : (
              <></>
            )}
            {editar ? (
              <Edit
                cardapio={cardapio}
                data={data}
                turno={turno}
                handleSetData={handleSetData}
                handleSetTurno={handleSetTurno}
                handleEditar={handleEditar}
                handleOnView={handleOnView}
              />
            ) : (
              <></>
            )}
            {add ? (
              <Add
                data={data}
                turno={turno}
                handleSetData={handleSetData}
                handleSetTurno={handleSetTurno}
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

export default EscolaCardapios;
