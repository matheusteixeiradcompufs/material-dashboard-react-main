import { Card, Grid, MenuItem, Select } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Edit({
  cardapio,
  data,
  handleSetData,
  turno,
  handleSetTurno,
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
          Modificar Cardápio
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={6}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="date"
              variant="outlined"
              label="Data"
              value={data}
              onChange={handleSetData}
              fullWidth
            />
          </MDBox>
        </Grid>
        <Grid item xs={6}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <Select value={turno} onChange={handleSetTurno} style={{ width: "100%", height: 45 }}>
              <MenuItem value="M">Manhã</MenuItem>
              <MenuItem value="T">Tarde</MenuItem>
              <MenuItem value="N">Noite</MenuItem>
            </Select>
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1}>
              <MDButton
                variant="contained"
                color="success"
                onClick={() => handleEditar(cardapio.id)}
              >
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="contained" color="error" onClick={() => handleOnView(cardapio.id)}>
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
  cardapio: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  handleSetData: PropTypes.func.isRequired,
  turno: PropTypes.string.isRequired,
  handleSetTurno: PropTypes.func.isRequired,
  handleEditar: PropTypes.func.isRequired,
  handleOnView: PropTypes.func.isRequired,
};

export default Edit;
