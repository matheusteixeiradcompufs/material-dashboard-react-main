import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Edit({
  item,
  nome,
  handleSetNome,
  descricao,
  handleSetDescricao,
  handleEditar,
  handleOnViewItens,
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
          Modificar Item
        </MDTypography>
      </MDBox>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <MDBox pt={3} px={2} display="flex">
            <MDInput
              variant="outlined"
              label="Nome"
              value={nome}
              onChange={handleSetNome}
              fullWidth
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MDBox pt={3} px={2} display="flex">
            <MDInput
              variant="outlined"
              label="Descrição"
              multiline
              rows={5}
              value={descricao}
              onChange={handleSetDescricao}
              fullWidth
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MDBox pt={3} px={2} mb={2} display="flex" justifyContent="center">
            <MDBox mr={1}>
              <MDButton variant="gradient" color="success" onClick={() => handleEditar(item.id)}>
                Salvar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="gradient" color="error" onClick={() => handleOnViewItens(item.id)}>
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
  item: PropTypes.object.isRequired,
  nome: PropTypes.string.isRequired,
  handleSetNome: PropTypes.func.isRequired,
  descricao: PropTypes.string.isRequired,
  handleSetDescricao: PropTypes.func.isRequired,
  handleEditar: PropTypes.func.isRequired,
  handleOnViewItens: PropTypes.func.isRequired,
};

export default Edit;
