import { FormControl, InputLabel } from "@mui/material";
import SelectRoot from "@mui/material/Select";
import PropTypes from "prop-types";

function Select({ label, children, ...rest }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-label-id">{label}</InputLabel>
      <SelectRoot
        labelId="select-label-id"
        id="select-id"
        label={label}
        {...rest}
        style={{ height: 45 }}
      >
        {children}
      </SelectRoot>
    </FormControl>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export default Select;
