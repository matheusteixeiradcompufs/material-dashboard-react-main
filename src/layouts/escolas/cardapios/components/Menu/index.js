import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Componente para exibir o menu de acesso ao cardápio.
 * @module escolas/cardapios/components
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.escolaid - O ID da escola.
 * @param {string} props.cardapioid - O ID do cardápio.
 * @returns {JSX.Element} Componente de menu de acesso ao cardápio.
 */
function Menu({ escolaid, cardapioid }) {
  return (
    <Card>
      <MDBox
        mx={2}
        mt={-2}
        py={2}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Acessar Cardápio
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1} ml={1}>
              {/* Link para acessar o cardápio */}
              <Link to={`/escola/${escolaid}/cardapio/${cardapioid}/itens`}>
                <MDButton variant="gradient" color="secondary">
                  Acessar
                </MDButton>
              </Link>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

/**
 * Propriedades esperadas pelo componente Menu.
 * @type {Object}
 * @property {string} escolaid - O ID da escola.
 * @property {string} cardapioid - O ID do cardápio.
 */
Menu.propTypes = {
  escolaid: PropTypes.string.isRequired,
  cardapioid: PropTypes.string.isRequired,
};

export default Menu;
