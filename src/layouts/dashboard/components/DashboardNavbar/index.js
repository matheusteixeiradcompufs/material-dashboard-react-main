import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Breadcrumbs from "examples/Breadcrumbs";
import { navbar, navbarContainer, navbarRow, navbarIconButton, navbarMobileMenu } from "./styles";
import { useMaterialUIController, setTransparentNavbar, setMiniSidenav } from "context";

/**
 * Componente de barra de navegação do painel de controle.
 * @module dashboard/components
 * @param {Object} props - Props para o componente DashboardNavbar.
 * @param {boolean} [props.absolute=false] - Define se a barra de navegação é absoluta.
 * @param {boolean} [props.light=false] - Define se a barra de navegação é clara.
 * @param {boolean} [props.isMini=false] - Define se a barra de navegação está em modo mini.
 * @returns {JSX.Element} Componente de barra de navegação do painel de controle.
 */
function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    /**
     * Define o tipo de barra de navegação.
     */
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    /**
     * Função que define o estado transparente da barra de navegação.
     */
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /**
     * O event listener que chama a função handleTransparentNavbar quando rolar a janela.
     */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Chama a função handleTransparentNavbar para definir o estado com o valor inicial.
    handleTransparentNavbar();

    // Remove o event listener na limpeza
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  /**
   * Estilos para os ícones da barra de navegação.
   * @param {Object} theme - O tema do Material-UI.
   * @returns {Object} Estilos dos ícones.
   */
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <Link to="/perfil">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Definindo valores padrão para as props de DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Checagem de tipos de props para DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
