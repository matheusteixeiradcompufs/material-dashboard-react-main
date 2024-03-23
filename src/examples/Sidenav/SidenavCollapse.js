// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import { Link, NavLink, useLocation } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { useState } from "react";
import { Collapse } from "@mui/material";

function SidenavCollapse({ icon, name, collapse, active, ...rest }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    setOpen(!open);
  };

  const renderCollapses =
    collapse &&
    collapse.map(({ name, key, route, component }) => (
      <Link key={key} to={route}>
        <ListItem component="li">
          <MDBox
            sx={(theme) =>
              collapseItem(theme, {
                active,
                transparentSidenav,
                whiteSidenav,
                darkMode,
                sidenavColor,
              })
            }
          >
            <ListItemText
              primary={name}
              sx={(theme) =>
                collapseText(theme, {
                  miniSidenav,
                  transparentSidenav,
                  whiteSidenav,
                  active,
                })
              }
            />
          </MDBox>
        </ListItem>
      </Link>
    ));

  return (
    <>
      <ListItem component="li" onClick={handleClick}>
        <MDBox
          {...rest}
          sx={(theme) =>
            collapseItem(theme, {
              active,
              transparentSidenav,
              whiteSidenav,
              darkMode,
              sidenavColor,
            })
          }
        >
          <ListItemIcon
            sx={(theme) =>
              collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active })
            }
          >
            {typeof icon === "string" ? (
              <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, {
                miniSidenav,
                transparentSidenav,
                whiteSidenav,
                active,
              })
            }
          />

          {/* Renderize os sublinks dentro de um sublista */}
          {collapse ? <>{open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}</> : <></>}
        </MDBox>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {renderCollapses}
        </List>
      </Collapse>
    </>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  active: false,
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  collapse: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["item", "collapse", "title", "divider"]).isRequired,
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      route: PropTypes.string,
      component: PropTypes.element,
    })
  ),
  active: PropTypes.bool,
};

export default SidenavCollapse;
