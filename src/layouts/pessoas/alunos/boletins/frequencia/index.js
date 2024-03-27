import AddIcon from "@mui/icons-material/Add";
import { Card, Fab, Grid, Switch } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { format } from "date-fns";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";
import List from "./components/List";
import Add from "./components/Add";
import Edit from "./components/Edit";

function BoletimFrequencia() {
  const { alunoid, boletimid } = useParams();
  const [boletim, setBoletim] = useState(null);
  const [dialetivo, setDialetivo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(true);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const fetchBoletim = async () => {
      try {
        const response = await api.get(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
        setBoletim(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar boletim!");
        console.log("Erro ao carregar boletim", error);
        setLoading(false);
      }
    };
    fetchBoletim();
  }, []);
  const handleChangeDate = (date) => {
    setSelectedDate(date);
  };
  const handleChangeChecked = () => {
    setChecked(!checked);
  };
  const handleOnAdd = () => {
    setList(false);
    setEdit(false);
    setAdd(true);
  };
  const handleOnEdit = (dialetivoid) => {
    const dialetivoView = boletim.objeto_frequencia.objetos_diasletivos.find(
      (objeto) => objeto.id === dialetivoid
    );
    setDialetivo(dialetivoView);
    setChecked(dialetivoView.presenca);
    setSelectedDate(new Date(dialetivoView.data));
    setList(false);
    setAdd(false);
    setEdit(true);
  };
  const handleOnList = () => {
    setDialetivo(null);
    setChecked(false);
    setSelectedDate(null);
    setEdit(false);
    setAdd(false);
    setList(true);
  };
  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/pessoas/aluno/frequencia/dialetivo/api/v1/", {
        data: format(selectedDate, "yyyy-MM-dd"),
        presenca: checked,
        frequencia: boletim?.objeto_frequencia.id,
      });
      const response = await api.get(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
      setBoletim(response.data);
      handleOnList();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao adicionar presença!");
      console.log("Erro ao adicionar presença!", error);
      setLoading(false);
    }
  };
  const handleEditar = async (dialetivoid) => {
    setLoading(true);
    try {
      await api.patch(`/pessoas/aluno/frequencia/dialetivo/api/v1/${dialetivoid}/`, {
        data: format(selectedDate, "yyyy-MM-dd"),
        presenca: checked,
      });
      const response = await api.get(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
      setBoletim(response.data);
      handleOnList();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao editar presença!");
      console.log("Erro ao editar presença!", error);
      setLoading(false);
    }
  };
  const handleExcluir = async (dialetivoid) => {
    setLoading(true);
    try {
      await api.post(`/pessoas/aluno/frequencia/dialetivo/api/v1/${dialetivoid}/`);
      const response = await api.get(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
      setBoletim(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir presença!");
      console.log("Erro ao excluir presença!", error);
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
      <MDBox pt={2} mb={3}>
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
              Frequência do Aluno
            </MDTypography>
          </MDBox>
          <MDBox pt={3} px={2} mb={2} display="flex" justifyContent="center">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MDBox display="flex" justifyContent="center">
                  <MDInput
                    label="Percentual"
                    type="text"
                    value={`${boletim?.objeto_frequencia.percentual.toFixed(1)}%`}
                    disabled
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <MDBox
                  mx={2}
                  mt={2}
                  py={1}
                  px={2}
                  mb={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  fullWidth
                >
                  <MDTypography variant="h6" color="white">
                    Lista de Presenças
                  </MDTypography>
                </MDBox>
                {list ? (
                  <List
                    boletim={boletim}
                    handleOnEdit={handleOnEdit}
                    handleExcluir={handleExcluir}
                  />
                ) : (
                  <></>
                )}
                {add ? (
                  <Add
                    selectedDate={selectedDate}
                    handleChangeDate={handleChangeDate}
                    checked={checked}
                    handleChangeChecked={handleChangeChecked}
                    handleAdd={handleAdd}
                    handleOnList={handleOnList}
                  />
                ) : (
                  <></>
                )}
                {edit ? (
                  <Edit
                    selectedDate={selectedDate}
                    handleChangeDate={handleChangeDate}
                    checked={checked}
                    handleChangeChecked={handleChangeChecked}
                    handleEditar={handleEditar}
                    handleOnList={handleOnList}
                  />
                ) : (
                  <></>
                )}
              </Grid>
              {list ? (
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
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default BoletimFrequencia;
