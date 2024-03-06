import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import Transfer from "./Transfer";
import { parseISO, getDay } from "date-fns";
import MDButton from "components/MDButton";

function TurmaDisciplinas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [turma, setTurma] = useState(null);
  const [segLeft, setSegLeft] = useState([]);
  const [segRight, setSegRight] = useState([]);
  const [terLeft, setTerLeft] = useState([]);
  const [terRight, setTerRight] = useState([]);
  const [quaLeft, setQuaLeft] = useState([]);
  const [quaRight, setQuaRight] = useState([]);
  const [quiLeft, setQuiLeft] = useState([]);
  const [quiRight, setQuiRight] = useState([]);
  const [sexLeft, setSexLeft] = useState([]);
  const [sexRight, setSexRight] = useState([]);
  function obterDisciplinas(dias) {
    let dom = [],
      seg = [],
      ter = [],
      qua = [],
      qui = [],
      sex = [],
      sab = [];
    dias.forEach((objeto) => {
      const dia_semana = getDay(parseISO(objeto.data));
      switch (dia_semana) {
        case 0:
          dom = objeto.objetos_disciplinas;
          break;
        case 1:
          seg = objeto.objetos_disciplinas;
          break;
        case 2:
          ter = objeto.objetos_disciplinas;
          break;
        case 3:
          qua = objeto.objetos_disciplinas;
          break;
        case 4:
          qui = objeto.objetos_disciplinas;
          break;
        case 5:
          sex = objeto.objetos_disciplinas;
          break;
        case 6:
          sab = objeto.objetos_disciplinas;
          break;
        default:
          break;
      }
    });
    return { dom, seg, ter, qua, qui, sex, sab };
  }
  useEffect(() => {
    const fetchTurma = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/escolas/sala/turma/api/v1/${id}/`);
        const { objetos_disciplinas, objeto_agenda } = response.data;
        const { seg, ter, qua, qui, sex } = obterDisciplinas(
          objeto_agenda.objetos_dias.slice(0, 7)
        );
        setTurma(response.data);
        setSegLeft(
          objetos_disciplinas.filter(
            (item) => !seg.some((element) => element.id === item.id && element.nome === item.nome)
          )
        );
        setSegRight(seg);
        setTerLeft(
          objetos_disciplinas.filter(
            (item) => !ter.some((element) => element.id === item.id && element.nome === item.nome)
          )
        );
        setTerRight(ter);
        setQuaLeft(
          objetos_disciplinas.filter(
            (item) => !qua.some((element) => element.id === item.id && element.nome === item.nome)
          )
        );
        setQuaRight(qua);
        setQuiLeft(
          objetos_disciplinas.filter(
            (item) => !qui.some((element) => element.id === item.id && element.nome === item.nome)
          )
        );
        setQuiRight(qui);
        setSexLeft(
          objetos_disciplinas.filter(
            (item) => !sex.some((element) => element.id === item.id && element.nome === item.nome)
          )
        );
        setSexRight(sex);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar turma!");
        console.log("Erro ao carregar turma!", error);
        setLoading(false);
      }
    };
    fetchTurma();
  }, []);
  const handleSalvarDisciplinas = async () => {
    setLoading(true);
    try {
      await api.post("/pessoas/agendasdisciplinas/", {
        agenda_id: turma.objeto_agenda.id,
        seg: segRight.map((item) => item.id),
        ter: terRight.map((item) => item.id),
        qua: quaRight.map((item) => item.id),
        qui: quiRight.map((item) => item.id),
        sex: sexRight.map((item) => item.id),
      });
      setLoading(false);
      navigate(`/turma/${id}`);
    } catch (error) {
      toast.error("Erro ao preencher a agenda com as disciplinas!");
      console.log("Erro ao preencher a agenda com as disciplinas!", error);
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
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Disciplinas dos dias
            </MDTypography>
          </MDBox>
          <Transfer
            day={"Segunda"}
            left={segLeft}
            right={segRight}
            setLeft={setSegLeft}
            setRight={setSegRight}
          />
          <Transfer
            day={"Terça"}
            left={terLeft}
            right={terRight}
            setLeft={setTerLeft}
            setRight={setTerRight}
          />
          <Transfer
            day={"Quarta"}
            left={quaLeft}
            right={quaRight}
            setLeft={setQuaLeft}
            setRight={setQuaRight}
          />
          <Transfer
            day={"Quinta"}
            left={quiLeft}
            right={quiRight}
            setLeft={setQuiLeft}
            setRight={setQuiRight}
          />
          <Transfer
            day={"Sexta"}
            left={sexLeft}
            right={sexRight}
            setLeft={setSexLeft}
            setRight={setSexRight}
          />
          <MDBox mx={2} py={3} px={2} display="flex" justifyContent="center">
            <MDBox mr={1}>
              <MDButton variant="gradient" color="success" onClick={handleSalvarDisciplinas}>
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="gradient" color="error" onClick={() => navigate(`/turma/${id}`)}>
                Cancelar
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default TurmaDisciplinas;
