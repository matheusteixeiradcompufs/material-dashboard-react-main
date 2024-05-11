import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Componente para exibir um menu de acesso ao mural de avisos de uma escola.
 * @module escolas/murais/components
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.escolaid - O ID da escola.
 * @param {string} props.muralid - O ID do mural.
 * @returns {JSX.Element} - Componente de menu de acesso ao mural de avisos.
 */
function Menu({ escolaid, muralid }) {
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
          Acessar o Mural de Avisos
        </MDTypography>
      </MDBox>
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} sm={12}>
          <MDBox display="flex" justifyContent="center" pt={2} px={2}>
            <MDBox mr={1} ml={1}>
              <Link to={`/escola/${escolaid}/mural/${muralid}/avisos`}>
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
 * Propriedades necessárias para o componente Menu.
 * @typedef {Object} MenuProps
 * @property {string} escolaid - O ID da escola.
 * @property {string} muralid - O ID do mural.
 */

/**
 * Propriedades do componente Menu.
 * @type {MenuProps}
 */
Menu.propTypes = {
  escolaid: PropTypes.string.isRequired,
  muralid: PropTypes.string.isRequired,
};

export default Menu;
