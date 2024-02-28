import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { toast } from "react-toastify";
import { api } from "services/apiClient";
import PropTypes from "prop-types";

function Add({
  nomeDisciplina,
  setDisciplinas,
  setLoading,
  handleChangeNomeDisciplina,
  handleOnListarDisciplina,
}) {
  const handleAddDisciplina = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/disciplina/api/v1/", {
        nome: nomeDisciplina,
      });
      const response = await api.get("/escolas/disciplina/api/v1/");
      setDisciplinas(response.data);
      setLoading(false);
      handleOnListarDisciplina();
    } catch (error) {
      toast.error("Erro ao adicionar nova disciplina!");
      console.log("Erro ao adicionar nova disciplina!", error);
      setLoading(false);
    }
  };
  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="success"
        borderRadius="lg"
        coloredShadow="success"
      >
        <MDTypography variant="h6" color="white">
          Cadastrar Nova Disciplina
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="Nome da Disciplina"
              value={nomeDisciplina}
              onChange={handleChangeNomeDisciplina}
              style={{ width: "100%" }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" flexDirection="row" justifyContent="center">
            <MDBox justifyContent="center">
              <MDButton variant="contained" color="success" onClick={handleAddDisciplina}>
                Cadastrar
              </MDButton>
            </MDBox>
            <MDBox justifyContent="center" ml={2}>
              <MDButton variant="contained" color="error" onClick={handleOnListarDisciplina}>
                Cancelar
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

Add.propTypes = {
  nomeDisciplina: PropTypes.string.isRequired,
  setDisciplinas: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  handleChangeNomeDisciplina: PropTypes.func.isRequired,
  handleOnListarDisciplina: PropTypes.func.isRequired,
};

export default Add;
