import React, { useEffect, useState } from "react";
import { Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import { api } from "services/apiClient";
import { Audio } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import List from "./components/List";
import View from "./components/View";
import Edit from "./components/Edit";
import Add from "./components/Add";
import Menu from "./components/Menu";

function Escolas() {
  const [escolas, setEscolas] = useState([]);
  const [escola, setEscola] = useState(true);
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [listar, setListar] = useState(true);
  const [editar, setEditar] = useState(false);
  const [view, setView] = useState(false);
  const [cnpjEscola, setCnpjEscola] = useState("");
  const [nomeEscola, setNomeEscola] = useState("");
  const [enderecoEscola, setEnderecoEscola] = useState("");
  const [descricaoEscola, setDescricaoEscola] = useState("");

  useEffect(() => {
    const fetchEscolas = async () => {
      try {
        const response = await api.get("/escolas/api/v1/");
        setEscolas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar escolas");
        console.error("Erro ao carregar escolas:", error);
        setLoading(false);
      }
    };
    fetchEscolas();
  }, []);

  const handleOnListarEscolas = () => {
    setEscola(null);
    setCnpjEscola("");
    setNomeEscola("");
    setEnderecoEscola("");
    setDescricaoEscola("");
    setAdd(false);
    setEditar(false);
    setView(false);
    setListar(true);
  };

  const handleOnViewEscolas = (escolaid) => {
    const escolaView = escolas.find((objeto) => objeto.id === escolaid);
    setEscola(escolaView);
    setCnpjEscola(escolaView.cnpj);
    setNomeEscola(escolaView.nome);
    setEnderecoEscola(escolaView.endereco);
    setDescricaoEscola(escolaView.descricao);
    setAdd(false);
    setEditar(false);
    setListar(false);
    setView(true);
  };

  const handleOnEditarEscolas = () => {
    setAdd(false);
    setView(false);
    setListar(false);
    setEditar(true);
  };

  const handleOnAddEscolas = () => {
    setEditar(false);
    setView(false);
    setListar(false);
    setAdd(true);
  };

  const handleSetCnpjEscola = (e) => {
    setCnpjEscola(e.target.value);
  };

  const handleSetNomeEscola = (e) => {
    setNomeEscola(e.target.value);
  };

  const handleSetEnderecoEscola = (e) => {
    setEnderecoEscola(e.target.value);
  };

  const handleSetDescricaoEscola = (e) => {
    setDescricaoEscola(e.target.value);
  };

  const handleExcluir = async (escolaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/api/v1/${escolaid}/`);
      const response = await api.get("/escolas/api/v1/");
      setEscolas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir escola");
      console.log("Erro ao excluir escola", error);
      setLoading(false);
    }
  };

  const handleAddEscola = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/api/v1/", {
        cnpj: cnpjEscola,
        nome: nomeEscola,
        endereco: enderecoEscola,
        descricao: descricaoEscola,
      });
      const response = await api.get("/escolas/api/v1/");
      setEscolas(response.data);
      handleOnListarEscolas();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar escola");
      console.log("Erro ao cadastrar escola", error);
      setLoading(false);
    }
  };

  const handleEditarEscola = async (escolaid) => {
    setLoading(true);
    try {
      await api.patch(`/escolas/api/v1/${escolaid}/`, {
        cnpj: cnpjEscola,
        nome: nomeEscola,
        endereco: enderecoEscola,
        descricao: descricaoEscola,
      });
      const response = await api.get("/escolas/api/v1/");
      setEscolas(response.data);
      handleOnListarEscolas();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao cadastrar escola");
      console.log("Erro ao cadastrar escola", error);
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
                escolas={escolas}
                handleOnViewEscolas={handleOnViewEscolas}
                handleExcluir={handleExcluir}
              />
            ) : (
              <></>
            )}
            {view ? (
              <>
                <MDBox>
                  <View
                    escola={escola}
                    cnpjEscola={cnpjEscola}
                    nomeEscola={nomeEscola}
                    enderecoEscola={enderecoEscola}
                    descricaoEscola={descricaoEscola}
                    handleSetCnpjEscola={handleSetCnpjEscola}
                    handleSetNomeEscola={handleSetNomeEscola}
                    handleSetEnderecoEscola={handleSetEnderecoEscola}
                    handleSetDescricaoEscola={handleSetDescricaoEscola}
                    handleOnEditarEscolas={handleOnEditarEscolas}
                    handleOnListarEscolas={handleOnListarEscolas}
                  />
                </MDBox>
                <MDBox mt={6}>
                  <Menu escola={escola} />
                </MDBox>
              </>
            ) : (
              <></>
            )}
            {editar ? (
              <Edit
                escola={escola}
                cnpjEscola={cnpjEscola}
                nomeEscola={nomeEscola}
                enderecoEscola={enderecoEscola}
                descricaoEscola={descricaoEscola}
                handleSetCnpjEscola={handleSetCnpjEscola}
                handleSetNomeEscola={handleSetNomeEscola}
                handleSetEnderecoEscola={handleSetEnderecoEscola}
                handleSetDescricaoEscola={handleSetDescricaoEscola}
                handleEditarEscola={handleEditarEscola}
                handleOnViewEscolas={handleOnViewEscolas}
              />
            ) : (
              <></>
            )}
            {add ? (
              <Add
                cnpjEscola={cnpjEscola}
                nomeEscola={nomeEscola}
                enderecoEscola={enderecoEscola}
                descricaoEscola={descricaoEscola}
                handleSetCnpjEscola={handleSetCnpjEscola}
                handleSetNomeEscola={handleSetNomeEscola}
                handleSetEnderecoEscola={handleSetEnderecoEscola}
                handleSetDescricaoEscola={handleSetDescricaoEscola}
                handleAddEscola={handleAddEscola}
                handleOnListarEscolas={handleOnListarEscolas}
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
                onClick={handleOnAddEscolas}
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

export default Escolas;
