import { Card, Grid, MenuItem, Select } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Edit({
  turma,
  nomeTurma,
  handleSetNomeTurma,
  selectedTurno,
  handleTurnoChange,
  anoTurma,
  handleSetAnoTurma,
  handleEditar,
  handleOnView,
}) {
  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="warning"
        borderRadius="lg"
        coloredShadow="warning"
      >
        <MDTypography variant="h6" color="white">
          Visualizar Turma
        </MDTypography>
      </MDBox>
      <Grid container spacing={1} mb={2}>
        <Grid item xs={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="Nome da Turma"
              value={nomeTurma}
              onChange={handleSetNomeTurma}
              fullWidth
            />
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={6}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <Select
              value={selectedTurno}
              onChange={handleTurnoChange}
              style={{ width: "100%", height: 45 }}
            >
              <MenuItem value="M">Manhã</MenuItem>
              <MenuItem value="T">Tarde</MenuItem>
              <MenuItem value="N">Noite</MenuItem>
            </Select>
          </MDBox>
        </Grid>
        <Grid item xs={6}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="number"
              variant="outlined"
              label="Ano"
              value={anoTurma}
              onChange={handleSetAnoTurma}
              fullWidth
              inputProps={{
                min: 2010,
                max: 2050,
                step: 1,
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" flexDirection="row" justifyContent="center">
            <MDBox justifyContent="center" mr={1}>
              <MDButton variant="contained" color="success" onClick={() => handleEditar(turma.id)}>
                Salvar
              </MDButton>
            </MDBox>
            <MDBox justifyContent="center" ml={1}>
              <MDButton variant="contained" color="error" onClick={() => handleOnView(turma.id)}>
                Cancelar
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

Edit.propTypes = {
  turma: PropTypes.object.isRequired,
  nomeTurma: PropTypes.string.isRequired,
  handleSetNomeTurma: PropTypes.func.isRequired,
  selectedTurno: PropTypes.string.isRequired,
  handleTurnoChange: PropTypes.func.isRequired,
  anoTurma: PropTypes.number.isRequired,
  handleSetAnoTurma: PropTypes.func.isRequired,
  handleEditar: PropTypes.func.isRequired,
  handleOnView: PropTypes.func.isRequired,
};

export default Edit;
