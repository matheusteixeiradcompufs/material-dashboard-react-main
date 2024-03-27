import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Edit({ email, endereco, handleSetEndereco, handleEditar, handleOnView }) {
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
          Modificar Email
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="Endereço"
              value={endereco}
              onChange={handleSetEndereco}
              fullWidth
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1}>
              <MDButton variant="contained" color="success" onClick={() => handleEditar(email.id)}>
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="contained" color="error" onClick={() => handleOnView(email.id)}>
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
  email: PropTypes.object.isRequired,
  endereco: PropTypes.string.isRequired,
  handleSetEndereco: PropTypes.func.isRequired,
  handleEditar: PropTypes.func.isRequired,
  handleOnView: PropTypes.func.isRequired,
};

export default Edit;
