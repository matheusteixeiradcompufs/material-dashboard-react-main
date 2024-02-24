import { Card, Grid } from "@mui/material";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import PropTypes from "prop-types";

function Disciplinas({ date, disciplinas }) {
  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="primary"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Disciplinas da {format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <Grid container justifyContent="center" paddingLeft={3} paddingRight={2} paddingTop={1}>
          {disciplinas.length !== 0 ? (
            <MDBox>
              <Grid item xs={12} sm={12} mb={2} container justifyContent="center">
                {disciplinas.map((objeto, index) => (
                  <MDBadge
                    key={index}
                    badgeContent={objeto.nome}
                    variant="gradient"
                    size="lg"
                    color="success"
                    container
                    style={{
                      marginRight: index !== disciplinas.length - 1 ? "5px" : 0,
                    }}
                  />
                ))}
              </Grid>
            </MDBox>
          ) : (
            <MDBox></MDBox>
          )}
        </Grid>
      </MDBox>
    </Card>
  );
}

Disciplinas.propTypes = {
  date: PropTypes.object.isRequired,
  disciplinas: PropTypes.array.isRequired,
};

export default Disciplinas;
