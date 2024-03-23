import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function View({ ano, handleSetAno, handleOnEditar, handleOnListar }) {
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
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="number"
              variant="outlined"
              label="Número"
              value={ano}
              onChange={handleSetAno}
              fullWidth
              disabled
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
  ano: PropTypes.number.isRequired,
  handleSetAno: PropTypes.func.isRequired,
  handleOnEditar: PropTypes.func.isRequired,
  handleOnListar: PropTypes.func.isRequired,
};

export default View;
