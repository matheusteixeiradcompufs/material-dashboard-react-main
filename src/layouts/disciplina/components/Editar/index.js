import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { toast } from "react-toastify";
import { api } from "services/apiClient";
import PropTypes from "prop-types";

function Editar({
  nomeDisciplina,
  disciplina,
  setDisciplinas,
  setLoading,
  handleChangeNomeDisciplina,
  handleOnListarDisciplina,
}) {
  const handleEditarDisciplina = async () => {
    setLoading(true);
    try {
      await api.patch(`/escolas/disciplina/api/v1/${disciplina.id}/`, {
        nome: nomeDisciplina,
      });
      const response = await api.get("/escolas/disciplina/api/v1/");
      setDisciplinas(response.data);
      handleOnListarDisciplina();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao alterar disciplina!");
      console.log("Erro ao alterar disciplina!", error);
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
          Editar Disciplina
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
              <MDButton variant="contained" color="success" onClick={handleEditarDisciplina}>
                Salvar
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

Editar.propTypes = {
  nomeDisciplina: PropTypes.string.isRequired,
  disciplina: PropTypes.object.isRequired,
  setDisciplinas: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  handleChangeNomeDisciplina: PropTypes.func.isRequired,
  handleOnListarDisciplina: PropTypes.func.isRequired,
};

export default Editar;
