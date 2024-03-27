import { Card, Grid, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Select from "examples/Select";
import PropTypes from "prop-types";

function Add({
  escolas,
  salas,
  turmas,
  selectedEscola,
  handleChangeEscola,
  selectedSala,
  handleChangeSala,
  selectedTurma,
  handleChangeTurma,
  handleAdd,
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
        bgColor="success"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Matricular Aluno
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <Select
              value={selectedEscola}
              label="Selecione uma escola"
              onChange={handleChangeEscola}
              fullWidth
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
              fullWidth
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
              fullWidth
            >
              {turmas?.map((turma, index) => (
                <MenuItem key={index} value={turma.id}>
                  {turma.nome} em {turma.ano} turno {turma.turno}
                </MenuItem>
              ))}
            </Select>
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1}>
              <MDButton variant="contained" color="success" onClick={handleAdd}>
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="contained" color="error" onClick={handleOnListar}>
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
  escolas: PropTypes.array.isRequired,
  salas: PropTypes.array.isRequired,
  turmas: PropTypes.array.isRequired,
  selectedEscola: PropTypes.number,
  handleChangeEscola: PropTypes.func.isRequired,
  selectedSala: PropTypes.number,
  handleChangeSala: PropTypes.func.isRequired,
  selectedTurma: PropTypes.number,
  handleChangeTurma: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleOnListar: PropTypes.func.isRequired,
};

export default Add;
