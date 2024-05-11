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

/* Função auxiliar para encontrar os elementos que estão em 'a' mas não em 'b'. */
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

/* Função auxiliar para encontrar a interseção entre dois arrays. */
function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

/**
 * Componente de transferência de itens entre duas listas.
 * @module transportes/alunos/gerenciar/components
 * @param {Object} props - As props do componente.
 * @param {Array} props.left - Os itens da lista esquerda.
 * @param {Array} props.right - Os itens da lista direita.
 * @param {Function} props.setLeft - Função para atualizar os itens da lista esquerda.
 * @param {Function} props.setRight - Função para atualizar os itens da lista direita.
 * @returns {JSX.Element} - Retorna o componente de transferência de itens.
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
                  primary={`${value.matricula} - ${value.objeto_usuario.first_name}`}
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
        <Grid item xs={12}>
          <MDBox
            py={1}
            px={1}
            mt={3}
            mb={1}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white" align="center">
              Selecione os Alunos do Transporte
            </MDTypography>
          </MDBox>
        </Grid>
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

Transfer.propTypes = {
  left: PropTypes.array.isRequired,
  right: PropTypes.array.isRequired,
  setLeft: PropTypes.func.isRequired,
  setRight: PropTypes.func.isRequired,
};
