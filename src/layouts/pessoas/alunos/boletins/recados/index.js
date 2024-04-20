import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useContext, useEffect, useRef, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import MDInput from "components/MDInput";
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import { Fab, Grid, Icon } from "@mui/material";
import MDButton from "components/MDButton";
import DownIcon from "@mui/icons-material/South";
import { AuthContext } from "context/AuthContext";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";

function BoletimRecados() {
  const [controller] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { refreshToken } = useContext(AuthContext);
  const { boletimid } = useParams();
  const [agendaRecados, setAgendaRecados] = useState(null);
  const [recados, setRecados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [texto, setTexto] = useState("");
  const [click, setClick] = useState(false);
  const messagesEndRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [scrollAtBottom, setScrollAtBottom] = useState(true);

  useEffect(() => {
    const fetchBoletim = async () => {
      try {
        const response = await api.get(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
        const { objeto_agenda } = response.data;
        setAgendaRecados(objeto_agenda);
        const { objetos_recados } = objeto_agenda;
        setRecados(objetos_recados);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchBoletim();
        } else {
          toast.error("Erro ao carregar agenda de recados!");
          console.log("Erro ao carregar agenda de recados!", error);
        }
        setLoading(false);
      }
    };
    fetchBoletim();
  }, []);

  useEffect(() => {
    const loadDataInterval = setInterval(async () => {
      try {
        if (agendaRecados) {
          const response = await api.get(
            `/pessoas/aluno/boletim/agenda/api/v1/${agendaRecados.id}/`
          );
          const { objetos_recados } = await response.data;
          setRecados(objetos_recados);
        }
      } catch (err) {
        console.log(err);
      }
    }, 1000);
    return () => clearInterval(loadDataInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setScrollAtBottom(isAtBottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [recados, click]);

  useEffect(() => {
    const calculateButtonPosition = () => {
      const windowWidth = window.innerWidth;
      const buttonX = miniSidenav ? windowWidth / 2 - 35 : (windowWidth - 205) / 2 + 205;
      const buttonY = 120;
      setButtonPosition({ x: buttonX, y: buttonY });
    };
    calculateButtonPosition();
  }, [miniSidenav]);

  const handleChangeTexto = (e) => {
    setTexto(e.target.value);
  };

  const handleClick = () => {
    setClick(!click);
  };

  const handleEnviar = async () => {
    try {
      const response = await api.post("/pessoas/aluno/boletim/agenda/recado/api/v1/", {
        texto: texto,
        agenda: agendaRecados.id,
      });
      setTexto("");
      setRecados([...recados, response.data]);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleEnviar();
      } else {
        toast.error("Erro ao enviar recado!");
        console.log("Erro ao enviar recado!", error);
      }
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
      <DashboardNavbar />
      <MDBox pt={6} mb={12} flexDirection="column">
        <Grid container>
          {recados?.map((objeto, index) => (
            <Grid item key={index} xs={12}>
              <MDBox display="flex">
                <MDBox
                  mt={1}
                  mb={1}
                  mx="auto"
                  py={2}
                  px={2}
                  variant="gradient"
                  bgColor={objeto.eh_aluno ? "white" : "info"}
                  borderRadius="lg"
                  alignSelf="right"
                  coloredShadow={objeto.eh_aluno ? "white" : "info"}
                  style={
                    objeto.eh_aluno
                      ? {
                          maxWidth: "45%",
                          marginLeft: 0,
                          borderTopLeftRadius: 0,
                          display: "inline-block",
                        }
                      : {
                          maxWidth: "45%",
                          marginRight: 0,
                          alignSelf: "right",
                          borderBottomRightRadius: 0,
                          display: "inline-block",
                        }
                  }
                >
                  <MDTypography variant="h6" color={objeto.eh_aluno ? "info" : "white"}>
                    {objeto.texto}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Grid>
          ))}
        </Grid>
        <div ref={messagesEndRef} />
        <MDBox
          px={1}
          py={1}
          bgColor="white"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          flexDirection="row"
          style={{
            width: "auto",
            position: "fixed",
            bottom: "2rem",
            left: miniSidenav ? "3rem" : "calc(260px + 4rem)",
            transition: "left 0.3s ease-in-out",
            right: "3rem",
          }}
        >
          <MDInput
            value={texto}
            onChange={handleChangeTexto}
            type="text"
            label="Digite sua mensagem"
            rows={2}
            multiline
            fullWidth
          />
        </MDBox>
      </MDBox>
      <MDButton
        variant="gradient"
        color="success"
        title="Enviar"
        style={{ position: "fixed", bottom: "3.25rem", right: "4rem" }}
        onClick={handleEnviar}
        iconOnly
      >
        <Icon>north</Icon>
      </MDButton>
      {!scrollAtBottom && (
        <Fab
          color="white"
          aria-label="Novas mensagens"
          size="large"
          style={{ position: "fixed", bottom: buttonPosition.y, left: buttonPosition.x }}
          onClick={handleClick}
        >
          <DownIcon color="dark" />
        </Fab>
      )}
    </DashboardLayout>
  );
}

export default BoletimRecados;
