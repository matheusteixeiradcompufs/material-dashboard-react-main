/**
 * LEITORQR. Esse é o layout que renderiza a página do leitor de QR Code.
 * @file
 */
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Card, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { QrReader } from "react-qr-reader";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { format } from "date-fns";
import confirmar from "assets/images/confirmar.png";
import cancelar from "assets/images/cancelar.png";
import BasicLayout from "layouts/leitorqr/components/BasicLayout";
import bgImage from "assets/images/Escola.png";
import { BASE_URL } from "services/api";

/**
 * Componente funcional que representa a página de leitura e validação de carteirinhas com QR code.
 * @module leitorqr
 * @returns {JSX.Element} O componente React para renderizar.
 */
const QRCodeReaderPage = () => {
  const [qrCode, setQRCode] = useState("No Result");
  const [lido, setLido] = useState(false);
  const [valido, setValido] = useState(false);
  const [data, setData] = useState("");
  const [turma, setTurma] = useState("");
  const [escola, setEscola] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [matricula, setMatricula] = useState("");

  useEffect(() => {
    /**
     * Função assíncrona para verificar a validade do token decodificado.
     * @returns {Promise<void>}
     */
    const verifyToken = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pessoas/decode-token/?token=${qrCode}`);
        if (!response.ok) {
          throw new Error("Erro ao verificar validade do token!");
        }
        const data = await response.json();
        const newDate = new Date(data.val);
        newDate.setDate(newDate.getDate() + 1);
        newDate.setHours(0);
        const atualDate = new Date();

        const yearStart = new Date(atualDate.getFullYear(), 0, 1);
        const yearEnd = new Date(atualDate.getFullYear(), 11, 31);
        const isValid = newDate >= yearStart && newDate <= yearEnd;
        setValido(isValid);

        setData(format(newDate, "dd/MM/yyyy"));
        setTurma(data.tur);
        setEscola(data.esc);
        setNome(data.nom);
        setSobrenome(data.sob);
        setMatricula(data.mat);
        setLido(true);
        if (isValid) {
          toast.success("Carteirinha dentro da validade!");
        } else {
          toast.error("Carteirinha sem validade!");
        }
      } catch (error) {
        console.log("Erro ao verificar validade do token!", error);
      }
    };
    verifyToken();
  }, [qrCode]);

  useEffect(() => {
    let timeoutId;
    if (lido) {
      // Define um temporizador para voltar a definir lido para false após 10 segundos
      timeoutId = setTimeout(() => {
        setLido(false);
        setQRCode("No Result");
        setValido(false);
        setData("");
        setTurma("");
        setEscola("");
        setNome("");
        setSobrenome("");
        setMatricula("");
      }, 10000); // 10000 milissegundos = 10 segundos
    }

    // Limpa o temporizador quando o componente é desmontado ou quando lido muda para false novamente
    return () => {
      clearTimeout(timeoutId);
    };
  }, [lido]);

  return (
    <BasicLayout image={bgImage}>
      <ToastContainer />
      <MDBox pt={6} mb={3} display="flex">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                mb={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Validar Carteirinha
                </MDTypography>
              </MDBox>
              <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                  {lido ? (
                    <Card sx={{ maxWidth: "100%", bgcolor: "#ced4da" }}>
                      <CardMedia
                        component="img"
                        alt="Validar Carteirinha"
                        height="250"
                        image={valido ? confirmar : cancelar}
                      />
                      <CardContent>
                        <MDTypography variant="body2" color="text.secondary">
                          <strong>Validade: </strong>
                          {data}
                        </MDTypography>
                        <MDTypography variant="body2" color="text.secondary">
                          <strong>Turma: </strong>
                          {turma}
                        </MDTypography>
                        <MDTypography variant="body2" color="text.secondary">
                          <strong>Escola: </strong>
                          {escola}
                        </MDTypography>
                        <MDTypography variant="body2" color="text.secondary">
                          <strong>Nome: </strong>
                          {nome}
                        </MDTypography>
                        <MDTypography variant="body2" color="text.secondary">
                          <strong>Sobrenome: </strong>
                          {sobrenome}
                        </MDTypography>
                        <MDTypography variant="body2" color="text.secondary">
                          <strong>Matrícula: </strong>
                          {matricula}
                        </MDTypography>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card sx={{ bgcolor: "#ced4da" }}>
                      <QrReader
                        onResult={(result, error) => {
                          if (!!result) {
                            setQRCode(result?.text);
                          }
                          if (!!error) {
                            console.info(error);
                          }
                        }}
                        style={{ width: "50%" }}
                      />
                    </Card>
                  )}
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
              <MDBox mb={3} />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </BasicLayout>
  );
};

export default QRCodeReaderPage;
