import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DadosInstitucionais({ matricula, username, email }) {
  return (
    <Card sx={{ boxShadow: "none" }}>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          dados institucionais
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          gerais
        </MDTypography>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5} mt={2}>
          <MDBox px={1.5} py={1}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              matrícula:
            </MDTypography>
          </MDBox>
          <MDBox display="flex" width="80%" ml={1.5} justifyContent="flex-end" py={1.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              {matricula}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox px={1.5} py={1}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              usuário:
            </MDTypography>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" width="80%" ml={0.5} py={1.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              {username}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="top" mb={0.5} ml={-1.5}>
          <MDBox px={1.5} py={1}>
            <MDTypography
              variant="button"
              alignItems="top"
              fontWeight="bold"
              textTransform="capitalize"
            >
              Email:
            </MDTypography>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" width="80%" ml={0.5} py={1.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              {email}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

DadosInstitucionais.propTypes = {
  matricula: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
};

export default DadosInstitucionais;
