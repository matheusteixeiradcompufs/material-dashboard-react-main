import { Card, FormControlLabel, Grid, MenuItem, Switch } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Select from "examples/Select";
import PropTypes from "prop-types";

function View({
  boletim,
  escolas,
  salas,
  turmas,
  selectedEscola,
  handleChangeEscola,
  selectedSala,
  handleChangeSala,
  selectedTurma,
  handleChangeTurma,
  handleOnEditar,
  handleOnListar,
}) {
  return (
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
          Visualizar Matrícula
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <Select
              value={selectedEscola}
              onChange={handleChangeEscola}
              label="Selecione uma Escola"
              disabled
            >
              {escolas?.map((escola, index) => (
                <MenuItem key={index} value={escola.id}>
                  {escola.nome}
                </MenuItem>
              ))}
            </Select>
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <Select
              value={selectedSala}
              onChange={handleChangeSala}
              label="Selecione uma Sala de Aula"
              disabled
            >
              {salas?.map((sala, index) => (
                <MenuItem key={index} value={sala.id}>
                  {sala.numero}
                </MenuItem>
              ))}
            </Select>
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <Select
              value={selectedTurma}
              onChange={handleChangeTurma}
              label="Selecione uma Turma"
              disabled
            >
              {turmas?.map((turma, index) => (
                <MenuItem key={index} value={turma.id}>
                  {turma.nome} em {turma.ano} turno {turma.turno}
                </MenuItem>
              ))}
            </Select>
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput type="text" value={boletim.status} disabled />
            <FormControlLabel
              control={<Switch checked={boletim.encerrar} />}
              label="Encerrar Boletim"
              labelPlacement="bottom"
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1}>
              <MDButton variant="contained" color="info" onClick={handleOnEditar}>
                Modificar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="contained" color="error" onClick={handleOnListar}>
                Voltar
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

View.propTypes = {
  boletim: PropTypes.object,
  escolas: PropTypes.array.isRequired,
  salas: PropTypes.array.isRequired,
  turmas: PropTypes.array.isRequired,
  selectedEscola: PropTypes.number,
  handleChangeEscola: PropTypes.func.isRequired,
  selectedSala: PropTypes.number,
  handleChangeSala: PropTypes.func.isRequired,
  selectedTurma: PropTypes.number,
  handleChangeTurma: PropTypes.func.isRequired,
  handleOnEditar: PropTypes.func.isRequired,
  handleOnListar: PropTypes.func.isRequired,
};

export default View;
