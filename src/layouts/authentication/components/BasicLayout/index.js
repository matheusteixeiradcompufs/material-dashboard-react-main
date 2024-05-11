import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";

/**
 * Componente para um layout básico com uma imagem de fundo.
 * @module authentication/components
 * @param {object} props - As props para o componente BasicLayout.
 * @param {string} props.image - O URL da imagem de fundo.
 * @param {ReactNode} props.children - Os elementos filhos a serem renderizados dentro do layout.
 * @returns {JSX.Element} Componente de layout básico.
 */
function BasicLayout({ image, children }) {
  return (
    <PageLayout>
      {/* Elemento de caixa para a imagem de fundo */}
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
      {/* Contêiner principal */}
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

// Verificação de tipo para as props do BasicLayout
BasicLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
