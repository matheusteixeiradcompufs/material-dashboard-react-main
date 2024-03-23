import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Add({
  cnpjEscola,
  nomeEscola,
  enderecoEscola,
  descricaoEscola,
  handleSetCnpjEscola,
  handleSetNomeEscola,
  handleSetEnderecoEscola,
  handleSetDescricaoEscola,
  handleAddEscola,
  handleOnListarEscolas,
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
          Cadastrar Nova Escola
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
              style={{ width: "100%" }}
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="Nome"
              value={nomeEscola}
              onChange={handleSetNomeEscola}
              style={{ width: "100%" }}
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="Endereço"
              value={enderecoEscola}
              onChange={handleSetEnderecoEscola}
              style={{ width: "100%" }}
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
              style={{ width: "100%" }}
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1}>
              <MDButton variant="contained" color="success" onClick={handleAddEscola}>
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="contained" color="error" onClick={handleOnListarEscolas}>
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
  cnpjEscola: PropTypes.string.isRequired,
  nomeEscola: PropTypes.string.isRequired,
  enderecoEscola: PropTypes.string.isRequired,
  descricaoEscola: PropTypes.string.isRequired,
  handleSetCnpjEscola: PropTypes.func.isRequired,
  handleSetNomeEscola: PropTypes.func.isRequired,
  handleSetEnderecoEscola: PropTypes.func.isRequired,
  handleSetDescricaoEscola: PropTypes.func.isRequired,
  handleAddEscola: PropTypes.func.isRequired,
  handleOnListarEscolas: PropTypes.func.isRequired,
};

export default Add;
