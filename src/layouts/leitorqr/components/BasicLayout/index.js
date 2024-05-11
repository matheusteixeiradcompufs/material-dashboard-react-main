import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import QRLayout from "examples/LayoutContainers/QRLayout";

/**
 * Componente de layout básico para páginas usando Material Dashboard 2 React.
 * @module leitorqr/components
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.image - URL da imagem de fundo.
 * @param {React.ReactNode} props.children - Componentes filhos a serem renderizados dentro do layout.
 * @returns {JSX.Element} O componente React para renderizar.
 */
function BasicLayout({ image, children }) {
  return (
    <QRLayout>
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
    </QRLayout>
  );
}

/**
 * Propriedades do componente BasicLayout.
 * @typedef {Object} BasicLayoutProps
 * @property {string} image - URL da imagem de fundo.
 * @property {React.ReactNode} children - Componentes filhos a serem renderizados dentro do layout.
 */

/**
 * Tipos esperados para as propriedades do BasicLayout.
 * @type {BasicLayoutProps}
 */
BasicLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
