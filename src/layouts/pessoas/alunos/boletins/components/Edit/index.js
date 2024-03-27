import { Card, FormControlLabel, Grid, MenuItem, Switch } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Select from "examples/Select";
import PropTypes from "prop-types";

function Edit({
  boletim,
  escolas,
  salas,
  turmas,
  encerrar,
  handleChangeEncerrar,
  selectedEscola,
  handleChangeEscola,
  selectedSala,
  handleChangeSala,
  selectedTurma,
  handleChangeTurma,
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
          Modificar Matrícula
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <Select
              value={selectedEscola}
              onChange={handleChangeEscola}
              label="Selecione uma Escola"
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
            >
              {salas?.map((sala, index) => (
                <MenuItem key={index} value={sala.id}>
                  {sala.numero}
                </MenuItem>
              ))}
            </Select>
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <Select value={selectedTurma} onChange={handleChangeTurma} label="Selecione uma Turma">
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
              control={<Switch checked={encerrar} onClick={handleChangeEncerrar} />}
              label="Encerrar Boletim"
              labelPlacement="bottom"
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1}>
              <MDButton
                variant="contained"
                color="success"
                onClick={() => handleEditar(boletim.id)}
              >
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="contained" color="error" onClick={() => handleOnView(boletim.id)}>
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
  boletim: PropTypes.object,
  escolas: PropTypes.array.isRequired,
  salas: PropTypes.array.isRequired,
  turmas: PropTypes.array.isRequired,
  encerrar: PropTypes.bool.isRequired,
  handleChangeEncerrar: PropTypes.func.isRequired,
  selectedEscola: PropTypes.number,
  handleChangeEscola: PropTypes.func.isRequired,
  selectedSala: PropTypes.number,
  handleChangeSala: PropTypes.func.isRequired,
  selectedTurma: PropTypes.number,
  handleChangeTurma: PropTypes.func.isRequired,
  handleEditar: PropTypes.func.isRequired,
  handleOnView: PropTypes.func.isRequired,
};

export default Edit;
