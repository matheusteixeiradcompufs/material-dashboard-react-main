import { Card, Grid, Switch } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { AuthContext } from "context/AuthContext";
import { format } from "date-fns";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/dashboard/components/DashboardNavbar";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "services/apiClient";

function AddDiasLetivosBoletimFrequencia() {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { alunoid, boletimid } = useParams();
  const [boletim, setBoletim] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoletim = async () => {
      try {
        const response = await api.get(`/pessoas/aluno/boletim/api/v1/${boletimid}/`);
        setBoletim(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          await refreshToken();
          await fetchBoletim();
        } else {
          toast.error("Erro ao carregar boletim!");
          console.log("Erro ao carregar boletim", error);
        }
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

  const handleAdd = async () => {
    setLoading(true);
    try {
      await api.post("/pessoas/aluno/frequencia/dialetivo/api/v1/", {
        data: format(selectedDate, "yyyy-MM-dd"),
        presenca: checked,
        frequencia: boletim?.objeto_frequencia.id,
      });
      navigate(`/pessoas/aluno/${alunoid}/boletim/${boletimid}/frequencia`);
    } catch (error) {
      if (error.response.status === 401) {
        await refreshToken();
        await handleAdd();
      } else {
        toast.error("Erro ao adicionar presença!");
        console.log("Erro ao adicionar presença!", error);
      }
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setLoading(true);
    navigate(`/pessoas/aluno/${alunoid}/boletim/${boletimid}/frequencia`);
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
                >
                  <MDTypography variant="h6" color="white">
                    Add Presença
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" flexDirection="row">
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <MDBox display="flex" justifyContent="center">
                        <DatePicker
                          label="Data"
                          value={selectedDate}
                          onChange={handleChangeDate}
                          align="left"
                          renderInput={(params) => <MDInput {...params} />}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={6}>
                      <MDBox display="flex" justifyContent="center">
                        <Switch checked={checked} onChange={handleChangeChecked} />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12}>
                      <MDBox display="flex" justifyContent="center">
                        <MDBox mr={1}>
                          <MDButton
                            variant="gradient"
                            color="success"
                            size="small"
                            onClick={handleAdd}
                          >
                            Salvar
                          </MDButton>
                        </MDBox>
                        <MDBox ml={1}>
                          <MDButton
                            variant="gradient"
                            color="error"
                            size="small"
                            onClick={handleCancelar}
                          >
                            Cancelar
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default AddDiasLetivosBoletimFrequencia;
