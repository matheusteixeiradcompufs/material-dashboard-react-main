import { Fab, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import AddIcon from "@mui/icons-material/Add";
import List from "./components/List";
import Detail from "./components/Detail";
import Edit from "./components/Edit";
import Add from "./components/Add";

function Itens() {
  const [loading, setLoading] = useState(true);
  const [itens, setItens] = useState([]);
  const [item, setItem] = useState(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [listarItens, setListarItens] = useState(true);
  const [addItens, setAddItens] = useState(false);
  const [editarItens, setEditarItens] = useState(false);
  const [viewItens, setViewItens] = useState(false);
  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await api.get("/escolas/cardapio/item/api/v1/");
        setItens(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar ítens da merenda!");
        console.log("Erro ao carregar ítens da merenda!", error);
        setLoading(false);
      }
    };
    fetchItens();
  }, []);
  const handleOnListarItens = () => {
    setItem(null);
    setNome("");
    setDescricao("");
    setEditarItens(false);
    setAddItens(false);
    setViewItens(false);
    setListarItens(true);
  };
  const handleOnViewItens = (itemid) => {
    const itemView = itens.find((objeto) => objeto.id === itemid);
    setItem(itemView);
    setNome(itemView.nome);
    setDescricao(itemView.descricao);
    setListarItens(false);
    setAddItens(false);
    setEditarItens(false);
    setViewItens(true);
  };
  const handleOnEditarItens = () => {
    setListarItens(false);
    setAddItens(false);
    setViewItens(false);
    setEditarItens(true);
  };
  const handleOnAddItens = () => {
    setListarItens(false);
    setEditarItens(false);
    setViewItens(false);
    setAddItens(true);
  };
  const handleSetNome = (e) => {
    setNome(e.target.value);
  };
  const handleSetDescricao = (e) => {
    setDescricao(e.target.value);
  };
  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/cardapio/item/api/v1/", {
        nome: nome,
        descricao: descricao,
      });
      const response = await api.get("/escolas/cardapio/item/api/v1/");
      setItens(response.data);
      handleOnListarItens();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao salvar item!");
      console.log("Erro ao salvar item!", error);
      setLoading(false);
    }
  };
  const handleEditar = async (itemid) => {
    setLoading(true);
    try {
      await api.patch(`/escolas/cardapio/item/api/v1/${itemid}/`, {
        nome: nome,
        descricao: descricao,
      });
      const response = await api.get("/escolas/cardapio/item/api/v1/");
      setItens(response.data);
      handleOnListarItens();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao editar item!");
      console.log("Erro ao editar item!", error);
      setLoading(false);
    }
  };
  const handleExcluir = async (itemid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/cardapio/item/api/v1/${itemid}/`);
      const response = await api.get("/escolas/cardapio/item/api/v1/");
      setItens(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir item!");
      console.log("Erro ao excluir item!", error);
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
            {listarItens ? (
              <List
                itens={itens}
                handleOnViewItens={handleOnViewItens}
                handleExcluir={handleExcluir}
                handleOnAddItens={handleOnAddItens}
              />
            ) : (
              <></>
            )}
            {viewItens ? (
              <Detail
                nome={nome}
                handleSetNome={handleSetNome}
                descricao={descricao}
                handleSetDescricao={handleSetDescricao}
                handleOnEditarItens={handleOnEditarItens}
                handleOnListarItens={handleOnListarItens}
              />
            ) : (
              <></>
            )}
            {editarItens ? (
              <Edit
                item={item}
                nome={nome}
                handleSetNome={handleSetNome}
                descricao={descricao}
                handleSetDescricao={handleSetDescricao}
                handleEditar={handleEditar}
                handleOnViewItens={handleOnViewItens}
              />
            ) : (
              <></>
            )}
            {addItens ? (
              <Add
                nome={nome}
                handleSetNome={handleSetNome}
                descricao={descricao}
                handleSetDescricao={handleSetDescricao}
                handleAdd={handleAdd}
                handleOnListarItens={handleOnListarItens}
              />
            ) : (
              <></>
            )}
          </Grid>
          {listarItens ? (
            <Grid item xs={12} mt={6}>
              <Fab
                color="success"
                aria-label="add"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
                onClick={handleOnAddItens}
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

export default Itens;
