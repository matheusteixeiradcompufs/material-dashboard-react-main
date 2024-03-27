import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Add({
  cpf,
  handleSetCpf,
  nome,
  handleSetNome,
  observacao,
  handleSetObservacao,
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
          Cadastrar Novo Responsável
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
  cpf: PropTypes.string.isRequired,
  handleSetCpf: PropTypes.func.isRequired,
  nome: PropTypes.string.isRequired,
  handleSetNome: PropTypes.func.isRequired,
  observacao: PropTypes.string.isRequired,
  handleSetObservacao: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleOnListar: PropTypes.func.isRequired,
};

export default Add;
