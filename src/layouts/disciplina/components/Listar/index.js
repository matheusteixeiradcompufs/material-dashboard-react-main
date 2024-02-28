import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { toast } from "react-toastify";
import { api } from "services/apiClient";
import PropTypes from "prop-types";

function Listar({ disciplinas, setDisciplinas, setLoading, handleOnEditarDisciplina }) {
  const handleExcluir = async (disciplinaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/disciplina/api/v1/${disciplinaid}/`);
      const response = await api.get("/escolas/disciplina/api/v1/");
      setDisciplinas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao excluir disciplina!");
      console.log("Erro ao excluir disciplina!", error);
      setLoading(false);
    }
  };
  const columns = [
    { Header: "nome", accessor: "nome", width: "80%", align: "left" },
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
          Disciplinas
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns,
            rows: disciplinas
              ? disciplinas.map((disciplina, index) => ({
                  nome: disciplina.nome,
                  opcoes: (
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                      <Grid item xs={12} sm={6} container>
                        <MDButton
                          variant="gradient"
                          color="info"
                          size="small"
                          onClick={() => handleOnEditarDisciplina(index)}
                        >
                          Editar
                        </MDButton>
                      </Grid>
                      <Grid item xs={12} sm={6} container>
                        <MDButton
                          variant="gradient"
                          color="error"
                          size="small"
                          onClick={() => handleExcluir(disciplina.id)}
                        >
                          Excluir
                        </MDButton>
                      </Grid>
                    </Grid>
                  ),
                }))
              : [],
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

Listar.propTypes = {
  disciplinas: PropTypes.array.isRequired,
  setDisciplinas: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  handleOnEditarDisciplina: PropTypes.func.isRequired,
};

export default Listar;
