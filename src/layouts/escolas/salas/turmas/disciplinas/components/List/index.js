import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

function List({ turma, handleOnGerenciar }) {
  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Disciplinas do {turma?.nome}
        </MDTypography>
      </MDBox>
      <MDBox justifyContent="center">
        <MDBox mx={2} py={3} px={2} flexDirection="column" justifyContent="center" align="center">
          {turma?.objetos_disciplinas ? (
            <DataTable
              table={{
                columns: [{ Header: "disciplina", accessor: "disciplina", align: "left" }],
                rows: turma?.objetos_disciplinas.map((objeto) => ({ disciplina: objeto.nome })),
              }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          ) : (
            <MDTypography>Sem disciplinas</MDTypography>
          )}
        </MDBox>
        <MDBox mx={2} py={3} px={2} display="flex" justifyContent="center">
          <MDButton variant="gradient" color="success" onClick={handleOnGerenciar}>
            Gerenciar
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

List.propTypes = {
  turma: PropTypes.object.isRequired,
  handleOnGerenciar: PropTypes.func.isRequired,
};

export default List;
