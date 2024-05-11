import { useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

/* Retorna os itens que estão em `a` mas não em `b`. 6*/
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

/* Retorna a interseção dos itens em `a` e `b`. */
function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

/**
 * Componente para transferir itens entre duas listas.
 * @module pessoas/funcionarios/turmas/components
 * @param {Object} props - Propriedades do componente.
 * @param {Array} props.left - Itens à esquerda.
 * @param {Array} props.right - Itens à direita.
 * @param {Function} props.setLeft - Função para atualizar os itens à esquerda.
 * @param {Function} props.setRight - Função para atualizar os itens à direita.
 * @returns {JSX.Element} Componente de transferência.
 */
export default function Transfer({ left, setLeft, right, setRight }) {
  const [checked, setChecked] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (header, items) => (
    <MDBox
      variant="gradient"
      bgColor="info"
      borderRadius="lg"
      coloredShadow="info"
      alignItems="center"
      style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5, paddingBottom: 5, minHeight: 320 }}
    >
      <MDTypography variant="h6" color="white" align="center" mb={0.5}>
        {header}
      </MDTypography>
      <Paper sx={{ width: "100%", height: "230", overflow: "auto" }}>
        <List dense component="div" role="list">
          {items?.map((value, index) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItemButton key={index} role="listitem" onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${value.nome} em ${value.ano} da ${value.objeto_sala.objeto_escola.nome}`}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Paper>
    </MDBox>
  );

  return (
    <>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={5}>
          {customList("Disponíveis", left)}
        </Grid>
        <Grid item xs={2}>
          <Grid container direction="column" alignItems="center">
            <MDBox>
              <MDButton
                variant="contained"
                color="info"
                size="small"
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                ≫
              </MDButton>
            </MDBox>
            <MDBox>
              <MDButton
                variant="contained"
                color="info"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </MDButton>
            </MDBox>
            <MDBox>
              <MDButton
                variant="contained"
                color="info"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </MDButton>
            </MDBox>
            <MDBox>
              <MDButton
                variant="contained"
                color="info"
                size="small"
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                ≪
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          {customList("Selecionadas", right)}
        </Grid>
      </Grid>
    </>
  );
}

/**
 * Propriedades esperadas pelo componente Transfer.
 * @type {Object}
 * @property {Array} left - Itens à esquerda.
 * @property {Array} right - Itens à direita.
 * @property {Function} setLeft - Função para atualizar os itens à esquerda.
 * @property {Function} setRight - Função para atualizar os itens à direita.
 */
Transfer.propTypes = {
  left: PropTypes.array.isRequired,
  right: PropTypes.array.isRequired,
  setLeft: PropTypes.func.isRequired,
  setRight: PropTypes.func.isRequired,
};
