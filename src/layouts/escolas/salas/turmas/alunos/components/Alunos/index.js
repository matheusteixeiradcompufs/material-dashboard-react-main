import { Card } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

function Alunos({ turma, handleView }) {
  const columns = [
    { Header: "aluno", accessor: "aluno", width: "45%", align: "left" },
    { Header: "matrícula", accessor: "matricula", align: "center" },
    { Header: "situação", accessor: "situacao", align: "center" },
    { Header: "opções", accessor: "opcoes", align: "center" },
  ];
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
          Alunos
        </MDTypography>
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{
            columns,
            rows:
              turma?.objetos_boletins.map((boletim) => ({
                aluno: (
                  <MDBox display="flex" alignItems="center" lineHeight={1}>
                    <MDAvatar
                      src={boletim.objeto_aluno.retrato}
                      name={boletim.objeto_aluno.objeto_usuario.first_name}
                      size="sm"
                    />
                    <MDBox ml={2} lineHeight={1}>
                      <MDTypography display="block" variant="button" fontWeight="medium">
                        {boletim.objeto_aluno.objeto_usuario.first_name}{" "}
                        {boletim.objeto_aluno.objeto_usuario.last_name}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                ),
                matricula: boletim.objeto_aluno.matricula,
                situacao: boletim.status,
                opcoes: (
                  <MDButton
                    variant="gradient"
                    color="info"
                    size="small"
                    onClick={() => handleView(boletim.objeto_aluno.id)}
                  >
                    Visualizar
                  </MDButton>
                ),
              })) || [],
          }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
    </Card>
  );
}

Alunos.propTypes = {
  turma: PropTypes.object.isRequired,
  handleView: PropTypes.func.isRequired,
};

export default Alunos;
