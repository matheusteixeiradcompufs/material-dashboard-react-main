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
import ManageIcon from "@mui/icons-material/Settings";
import Manage from "./components/Manage";

function CardapioItens() {
  const { cardapioid } = useParams();
  const [loading, setLoading] = useState(true);
  const [itensCardapio, setItensCardapio] = useState([]);
  const [itens, setItens] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [listarItens, setListarItens] = useState(true);
  const [viewItens, setViewItens] = useState(false);
  const [gerenciarItens, setGerenciarItens] = useState(false);
  useEffect(() => {
    const fetchItens = async () => {
      try {
        let response = await api.get(`/escolas/cardapio/api/v1/${cardapioid}/`);
        setItensCardapio(response.data.objetos_itens);
        response = await api.get("/escolas/cardapio/item/api/v1");
        setItens(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar cardápio!");
        console.log("Erro ao carregar cardápio!", error);
        setLoading(false);
      }
    };
    fetchItens();
  }, []);
  const handleOnListarItens = () => {
    setLeft([]);
    setRight([]);
    setNome("");
    setDescricao("");
    setViewItens(false);
    setGerenciarItens(false);
    setListarItens(true);
  };
  const handleOnViewItens = (itemid) => {
    const itemView = itens.find((objeto) => objeto.id === itemid);
    setNome(itemView.nome);
    setDescricao(itemView.descricao);
    setListarItens(false);
    setGerenciarItens(false);
    setViewItens(true);
  };
  const handleOnGerenciarItens = () => {
    setRight(itensCardapio);
    setLeft(itens.filter((item) => !itensCardapio.some((element) => element.id === item.id)));
    setViewItens(false);
    setListarItens(false);
    setGerenciarItens(true);
  };
  const handleSetNome = (e) => {
    setNome(e.target.value);
  };
  const handleSetDescricao = (e) => {
    setDescricao(e.target.value);
  };
  const handleSalvar = async () => {
    setLoading(true);
    try {
      const response = await api.patch(`/escolas/cardapio/api/v1/${cardapioid}/`, {
        itens: right.map((item) => item.id),
      });
      setItensCardapio(response.data.objetos_itens);
      handleOnListarItens();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao salvar itens no cardápio!");
      console.log("Erro ao salvar itens no cardápio!", error);
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
              <List itens={itensCardapio} handleOnViewItens={handleOnViewItens} />
            ) : (
              <></>
            )}
            {viewItens ? (
              <Detail
                nome={nome}
                handleSetNome={handleSetNome}
                descricao={descricao}
                handleSetDescricao={handleSetDescricao}
                handleOnListarItens={handleOnListarItens}
              />
            ) : (
              <></>
            )}
            {gerenciarItens ? (
              <Manage
                left={left}
                setLeft={setLeft}
                right={right}
                setRight={setRight}
                handleSalvar={handleSalvar}
                handleOnListarItens={handleOnListarItens}
              />
            ) : (
              <></>
            )}
          </Grid>
          {listarItens ? (
            <Grid item xs={12} mt={6}>
              <Fab
                color="info"
                aria-label="Gerenciar Cardápio"
                style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
                onClick={handleOnGerenciarItens}
              >
                <ManageIcon color="white" />
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

export default CardapioItens;
