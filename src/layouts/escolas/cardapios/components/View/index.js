import { Card, Grid, Select, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function View({ data, handleSetData, turno, handleSetTurno, handleOnEditar, handleOnListar }) {
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
          Visualizar Mural
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
              disabled
            />
          </MDBox>
        </Grid>
        <Grid item xs={6}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <Select
              value={turno}
              onChange={handleSetTurno}
              style={{ width: "100%", height: 45 }}
              disabled
            >
              <MenuItem value="M">Manhã</MenuItem>
              <MenuItem value="T">Tarde</MenuItem>
              <MenuItem value="N">Noite</MenuItem>
            </Select>
          </MDBox>
        </Grid>
        <Grid item xs={12}>
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
  data: PropTypes.string.isRequired,
  handleSetData: PropTypes.func.isRequired,
  turno: PropTypes.string.isRequired,
  handleSetTurno: PropTypes.func.isRequired,
  handleOnEditar: PropTypes.func.isRequired,
  handleOnListar: PropTypes.func.isRequired,
};

export default View;
