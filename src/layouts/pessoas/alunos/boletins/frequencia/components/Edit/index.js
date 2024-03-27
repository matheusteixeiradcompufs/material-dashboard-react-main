import { Grid, Switch } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import PropTypes from "prop-types";

function Edit({
  selectedDate,
  handleChangeDate,
  checked,
  handleChangeChecked,
  handleEditar,
  handleOnList,
}) {
  return (
    <MDBox display="flex" flexDirection="row">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <MDBox display="flex" justifyContent="center">
            <DatePicker
              label="Data"
              value={selectedDate}
              onChange={handleChangeDate}
              align="left"
              renderInput={(params) => <MDInput {...params} />}
            />
          </MDBox>
        </Grid>
        <Grid item xs={6}>
          <MDBox display="flex" justifyContent="center">
            <Switch checked={checked} onChange={handleChangeChecked} />
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <MDBox display="flex" justifyContent="center">
            <MDBox mr={1}>
              <MDButton
                variant="gradient"
                color="success"
                size="small"
                onClick={() => handleEditar(dialetivo.id)}
              >
                Editar
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="gradient" color="error" size="small" onClick={handleOnList}>
                Cancelar
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

Edit.propTypes = {
  selectedDate: PropTypes.object,
  handleChangeDate: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  handleChangeChecked: PropTypes.func.isRequired,
  handleEditar: PropTypes.func.isRequired,
  handleOnList: PropTypes.func.isRequired,
};

export default Edit;
