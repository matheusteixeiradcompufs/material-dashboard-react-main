import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Edit({
  responsavel,
  cpf,
  handleSetCpf,
  nome,
  handleSetNome,
  observacao,
  handleSetObservacao,
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
          Modificar Responsável
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="CPF"
              value={cpf}
              onChange={handleSetCpf}
              fullWidth
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="Nome"
              value={nome}
              onChange={handleSetNome}
              fullWidth
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDInput
              type="text"
              variant="outlined"
              label="Observação"
              multiline
              rows={3}
              value={observacao}
              onChange={handleSetObservacao}
              fullWidth
            />
          </MDBox>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1}>
              <MDButton
                variant="contained"
                color="success"
                onClick={() => handleEditar(responsavel.id)}
              >
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton
                variant="contained"
                color="error"
                onClick={() => handleOnView(responsavel.id)}
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
  responsavel: PropTypes.object.isRequired,
  cpf: PropTypes.string.isRequired,
  handleSetCpf: PropTypes.func.isRequired,
  nome: PropTypes.string.isRequired,
  handleSetNome: PropTypes.func.isRequired,
  observacao: PropTypes.string.isRequired,
  handleSetObservacao: PropTypes.func.isRequired,
  handleEditar: PropTypes.func.isRequired,
  handleOnView: PropTypes.func.isRequired,
};

export default Edit;
