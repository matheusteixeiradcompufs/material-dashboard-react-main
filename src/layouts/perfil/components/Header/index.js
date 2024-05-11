import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import breakpoints from "assets/theme/base/breakpoints";
import backgroundImage from "assets/images/bg-profile.jpeg";
import { BASE_URL } from "services/api";

/**
 * Componente para o cabeçalho da página, exibindo uma imagem de perfil, nome e cargo.
 * @module perfil/components
 * @param {Object} props - As propriedades do componente.
 * @param {string} props.portrait - A URL da imagem do perfil.
 * @param {string} props.name - O nome do usuário.
 * @param {string} props.cargo - O cargo do usuário.
 * @param {React.ReactNode} props.children - Componentes filhos a serem renderizados dentro do cabeçalho.
 * @returns {JSX.Element} O componente React para renderizar.
 */
function Header({ portrait, name, cargo, children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  useEffect(() => {
    /**
     * Uma função que define a orientação das abas.
     * @returns {void}
     */
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    // Adiciona um ouvinte de evento para redimensionar a janela.
    window.addEventListener("resize", handleTabsOrientation);

    // Chama a função handleTabsOrientation para definir o estado com o valor inicial.
    handleTabsOrientation();

    // Remove o ouvinte de evento ao limpar
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar
              src={portrait.startsWith(`${BASE_URL}`) ? portrait : `${BASE_URL}${portrait}`}
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {name}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {cargo}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

/**
 * Propriedades padrão do componente.
 * @memberof Header
 * @property {string} portrait - A URL da imagem do perfil.
 * @property {string} name - O nome do usuário.
 * @property {string} cargo - O cargo do usuário.
 * @property {React.ReactNode} children - Componentes filhos a serem renderizados dentro do cabeçalho.
 */
Header.defaultProps = {
  name: "",
  cargo: "",
  children: "",
};

/**
 * Tipos esperados das propriedades do componente.
 * @memberof Header
 * @property {string} portrait - A URL da imagem do perfil.
 * @property {string} name - O nome do usuário.
 * @property {string} cargo - O cargo do usuário.
 * @property {React.ReactNode} children - Componentes filhos a serem renderizados dentro do cabeçalho.
 */
Header.propTypes = {
  portrait: PropTypes.string,
  name: PropTypes.string,
  cargo: PropTypes.string,
  children: PropTypes.node,
};

export default Header;
