import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Detail({ nome, handleSetNome, descricao, handleSetDescricao, handleOnListarItens }) {
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
          Detalhes do Item
        </MDTypography>
      </MDBox>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <MDBox pt={3} px={2}>
            <MDInput
              variant="outlined"
              label="Nome"
              value={nome}
              onChange={handleSetNome}
              fullWidth
              disabled
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MDBox pt={3} px={2}>
            <MDInput
              variant="outlined"
              label="Descrição"
              multiline
              rows={5}
              value={descricao}
              onChange={handleSetDescricao}
              fullWidth
              disabled
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MDBox pt={3} px={2} mb={2} display="flex" justifyContent="center">
            <MDButton variant="gradient" color="error" onClick={handleOnListarItens}>
              Voltar
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

Detail.propTypes = {
  nome: PropTypes.string.isRequired,
  handleSetNome: PropTypes.func.isRequired,
  descricao: PropTypes.string.isRequired,
  handleSetDescricao: PropTypes.func.isRequired,
  handleOnListarItens: PropTypes.func.isRequired,
};

export default Detail;
