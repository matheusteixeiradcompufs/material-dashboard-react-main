/**
 * Função que retorna os estilos da barra de navegação.
 * @module dashboard/components
 * @param {Object} theme - O tema do Material-UI.
 * @param {Object} ownerState - O estado do proprietário da barra de navegação.
 * @returns {Object} Estilos da barra de navegação.
 */
function navbar(theme, ownerState) {
  const { palette, boxShadows, functions, transitions, breakpoints, borders } = theme;
  const { transparentNavbar, absolute, light, darkMode } = ownerState;

  const { dark, white, text, transparent, background } = palette;
  const { navbarBoxShadow } = boxShadows;
  const { rgba, pxToRem } = functions;
  const { borderRadius } = borders;

  return {
    boxShadow: transparentNavbar || absolute ? "none" : navbarBoxShadow,
    backdropFilter: transparentNavbar || absolute ? "none" : `saturate(200%) blur(${pxToRem(30)})`,
    backgroundColor:
      transparentNavbar || absolute
        ? `${transparent.main} !important`
        : rgba(darkMode ? background.default : white.main, 0.8),

    /**
     * Função para definir a cor do texto da barra de navegação.
     * @returns {string} Cor do texto.
     */
    color: () => {
      let color;

      if (light) {
        color = white.main;
      } else if (transparentNavbar) {
        color = text.main;
      } else {
        color = dark.main;
      }

      return color;
    },
    top: absolute ? 0 : pxToRem(12),
    minHeight: pxToRem(75),
    display: "grid",
    alignItems: "center",
    borderRadius: borderRadius.xl,
    paddingTop: pxToRem(8),
    paddingBottom: pxToRem(8),
    paddingRight: absolute ? pxToRem(8) : 0,
    paddingLeft: absolute ? pxToRem(16) : 0,

    "& > *": {
      transition: transitions.create("all", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    "& .MuiToolbar-root": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      [breakpoints.up("sm")]: {
        minHeight: "auto",
        padding: `${pxToRem(4)} ${pxToRem(16)}`,
      },
    },
  };
}

/**
 * Estilos para o contêiner da barra de navegação.
 * @param {Object} breakpoints - Pontos de interrupção do Material-UI.
 * @returns {Object} Estilos do contêiner da barra de navegação.
 */
const navbarContainer = ({ breakpoints }) => ({
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  pt: 0.5,
  pb: 0.5,

  [breakpoints.up("md")]: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "0",
    paddingBottom: "0",
  },
});

/**
 * Estilos para a linha da barra de navegação.
 * @param {Object} breakpoints - Pontos de interrupção do Material-UI.
 * @param {Object} options - Opções adicionais para a linha da barra de navegação.
 * @param {boolean} options.isMini - Define se a barra de navegação está em modo mini.
 * @returns {Object} Estilos da linha da barra de navegação.
 */
const navbarRow = ({ breakpoints }, { isMini }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",

  [breakpoints.up("md")]: {
    justifyContent: isMini ? "space-between" : "stretch",
    width: isMini ? "100%" : "max-content",
  },

  [breakpoints.up("xl")]: {
    justifyContent: "stretch !important",
    width: "max-content !important",
  },
});

/**
 * Estilos para o botão de ícone da barra de navegação.
 * @param {Object} typography - Tipografia do Material-UI.
 * @param {Object} breakpoints - Pontos de interrupção do Material-UI.
 * @returns {Object} Estilos do botão de ícone da barra de navegação.
 */
const navbarIconButton = ({ typography: { size }, breakpoints }) => ({
  px: 1,

  "& .material-icons, .material-icons-round": {
    fontSize: `${size.xl} !important`,
  },

  "& .MuiTypography-root": {
    display: "none",

    [breakpoints.up("sm")]: {
      display: "inline-block",
      lineHeight: 1.2,
      ml: 0.5,
    },
  },
});

/**
 * Estilos para o menu móvel da barra de navegação.
 * @param {Object} breakpoints - Pontos de interrupção do Material-UI.
 * @returns {Object} Estilos do menu móvel da barra de navegação.
 */
const navbarMobileMenu = ({ breakpoints }) => ({
  display: "inline-block",
  lineHeight: 0,

  [breakpoints.up("xl")]: {
    display: "none",
  },
});

export { navbar, navbarContainer, navbarRow, navbarIconButton, navbarMobileMenu };
