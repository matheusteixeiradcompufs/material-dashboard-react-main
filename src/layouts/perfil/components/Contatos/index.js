import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Contatos({ telefones, emails }) {
  return (
    <Card sx={{ boxShadow: "none" }}>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Informações de Contato
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          gerais
        </MDTypography>
        <MDBox mt={2}>
          {telefones.map((telefone, index) => (
            <MDBox
              key={index}
              display="flex"
              alignItems="top"
              mb={0.5}
              ml={-1.5}
              justifyContent="space-between"
            >
              <MDBox px={1.5} py={1}>
                <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                  {index === 0 ? "telefones:" : ""}
                </MDTypography>
              </MDBox>
              <MDBox display="flex" justifyContent="flex-end" width="80%" ml={1.5} py={1.5}>
                <MDTypography variant="button" fontWeight="regular" color="text">
                  {telefone.numero}
                </MDTypography>
              </MDBox>
            </MDBox>
          ))}
          {emails.map((email, index) => (
            <MDBox
              key={index}
              display="flex"
              alignItems="top"
              mb={0.5}
              ml={-1.5}
              justifyContent="space-between"
            >
              <MDBox px={1.5} py={1}>
                <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                  {index === 0 ? "Emails:" : ""}
                </MDTypography>
              </MDBox>
              <MDBox display="flex" justifyContent="flex-end" width="80%" ml={0.5} py={1.5}>
                <MDTypography variant="button" fontWeight="regular" color="text">
                  {email.endereco}
                </MDTypography>
              </MDBox>
            </MDBox>
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

Contatos.propTypes = {
  telefones: PropTypes.array,
  emails: PropTypes.array,
};

export default Contatos;
