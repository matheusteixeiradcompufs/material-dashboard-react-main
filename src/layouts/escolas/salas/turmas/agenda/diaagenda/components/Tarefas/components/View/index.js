import { Grid, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";

function View({
  nome,
  handleSetNome,
  descricao,
  handleSetDescricao,
  tipo,
  handleSetTipo,
  dataEntrega,
  handleSetDataEntrega,
  handleOnEditTarefa,
  handleOffAdd,
}) {
  return (
    <MDBox pt={3} px={2} mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MDInput
            variant="outlined"
            label="Nome"
            type="text"
            fullWidth
            value={nome}
            onChange={handleSetNome}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <MDInput
            variant="outlined"
            label="Descrição"
            type="text"
            multiline
            rows={3}
            fullWidth
            value={descricao}
            onChange={handleSetDescricao}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            value={tipo}
            onChange={handleSetTipo}
            style={{ width: "100%", height: 45 }}
            disabled
          >
            <MenuItem value="C">Casa</MenuItem>
            <MenuItem value="E">Escola</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label="Data"
            value={dataEntrega}
            onChange={handleSetDataEntrega}
            align="left"
            renderInput={(params) => <MDInput {...params} />}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <MDBox display="flex" flexDirection="row" justifyContent="center">
            <MDBox mr={1}>
              <MDButton variant="gradient" color="info" onClick={handleOnEditTarefa}>
                Modificar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="gradient" color="error" onClick={handleOffAdd}>
                Cancelar
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

View.propTypes = {
  nome: PropTypes.string.isRequired,
  handleSetNome: PropTypes.func.isRequired,
  descricao: PropTypes.string.isRequired,
  handleSetDescricao: PropTypes.func.isRequired,
  tipo: PropTypes.string.isRequired,
  handleSetTipo: PropTypes.func.isRequired,
  dataEntrega: PropTypes.object.isRequired,
  handleSetDataEntrega: PropTypes.func.isRequired,
  handleOnEditTarefa: PropTypes.func.isRequired,
  handleOffAdd: PropTypes.func.isRequired,
};

export default View;
