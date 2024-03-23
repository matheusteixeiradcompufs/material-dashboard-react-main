import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Edit({
  escola,
  cnpjEscola,
  nomeEscola,
  enderecoEscola,
  descricaoEscola,
  handleSetCnpjEscola,
  handleSetNomeEscola,
  handleSetEnderecoEscola,
  handleSetDescricaoEscola,
  handleEditarEscola,
  handleOnViewEscolas,
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
          Modificar Escola
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="number"
              variant="outlined"
              label="CNPJ"
              value={cnpjEscola}
              onChange={handleSetCnpjEscola}
              fullWidth
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="Nome"
              value={nomeEscola}
              onChange={handleSetNomeEscola}
              fullWidth
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="Endereço"
              value={enderecoEscola}
              onChange={handleSetEnderecoEscola}
              fullWidth
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="Descrição"
              value={descricaoEscola}
              onChange={handleSetDescricaoEscola}
              multiline
              rows={3}
              fullWidth
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1}>
              <MDButton
                variant="contained"
                color="success"
                onClick={() => handleEditarEscola(escola.id)}
              >
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton
                variant="contained"
                color="error"
                onClick={() => handleOnViewEscolas(escola.id)}
              >
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
  escola: PropTypes.object.isRequired,
  cnpjEscola: PropTypes.string.isRequired,
  nomeEscola: PropTypes.string.isRequired,
  enderecoEscola: PropTypes.string.isRequired,
  descricaoEscola: PropTypes.string.isRequired,
  handleSetCnpjEscola: PropTypes.func.isRequired,
  handleSetNomeEscola: PropTypes.func.isRequired,
  handleSetEnderecoEscola: PropTypes.func.isRequired,
  handleSetDescricaoEscola: PropTypes.func.isRequired,
  handleEditarEscola: PropTypes.func.isRequired,
  handleOnViewEscolas: PropTypes.func.isRequired,
};

export default Edit;
