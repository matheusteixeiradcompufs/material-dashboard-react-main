import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { toast } from "react-toastify";
import { api } from "services/apiClient";
import PropTypes from "prop-types";
import MDInput from "components/MDInput";
import { useState } from "react";

function Sala({ id, escola, setEscola, setLoading }) {
  const [addSala, setAddSala] = useState(false);
  const [numeroSala, setNumeroSala] = useState("");
  const [quantidadeAlunos, setQuantidadeAlunos] = useState("");
  const handleSetNumeroSala = (e) => {
    setNumeroSala(e.target.value);
  };
  const handleSetQuantidadeAlunos = (e) => {
    setQuantidadeAlunos(e.target.value);
  };
  const handleCancelarSala = () => {
    setAddSala(false);
    setNumeroSala("");
    setQuantidadeAlunos("");
  };
  const handleSalvarSala = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/sala/api/v1/", {
        numero: numeroSala,
        quantidade_alunos: quantidadeAlunos,
        escola: escola.id,
      });
      const response = await api.get(`/escolas/api/v1/${id}`);
      setEscola(response.data);
      setLoading(false);
      handleCancelarSala();
    } catch (error) {
      toast.error("Erro ao salvar sala!");
      console.log("Erro ao salvar sala!", error);
      setLoading(false);
    }
  };
  const handleExcluirSala = async (salaid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/sala/api/v1/${salaid}`);
      const response = await api.get(`/escolas/api/v1/${id}`);
      setEscola(response.data);
      setLoading(false);
      setAddSala(false);
    } catch (error) {
      toast.error("Erro ao excluir sala!");
      console.log("Erro ao excluir sala!", error);
      setLoading(false);
    }
  };
  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="dark"
        borderRadius="lg"
        coloredShadow="dark"
      >
        <MDTypography variant="h6" color="white">
          Salas
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns: [
              { Header: "Número", accessor: "numero", align: "left" },
              {
                Header: "Quantidade de Alunos",
                accessor: "quantidade_alunos",
                align: "center",
              },
              { Header: "", accessor: "excluir", align: "right" },
            ],
            rows: [
              ...escola?.objetos_salas.map((sala) => ({
                numero: sala.numero,
                quantidade_alunos: sala.quantidade_alunos,
                excluir: (
                  <MDButton
                    variant="gradient"
                    color="error"
                    size="small"
                    onClick={() => handleExcluirSala(sala.id)}
                  >
                    Excluir
                  </MDButton>
                ),
              })),
              addSala
                ? {
                    numero: (
                      <MDInput
                        type="number"
                        label="Número"
                        value={numeroSala}
                        onChange={handleSetNumeroSala}
                      />
                    ),
                    quantidade_alunos: (
                      <MDInput
                        type="number"
                        label="Quantidade"
                        value={quantidadeAlunos}
                        onChange={handleSetQuantidadeAlunos}
                      />
                    ),
                    excluir: (
                      <MDBox display="flex" justifyContent="center">
                        <MDBox justifyContent="center">
                          <MDButton
                            variant="gradient"
                            color="success"
                            size="small"
                            onClick={handleSalvarSala}
                          >
                            Salvar
                          </MDButton>
                        </MDBox>
                        <MDBox justifyContent="center" ml={2}>
                          <MDButton
                            variant="gradient"
                            color="error"
                            size="small"
                            onClick={handleCancelarSala}
                          >
                            Cancelar
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    ),
                  }
                : {
                    endereco: "",
                    excluir: (
                      <MDButton
                        variant="gradient"
                        color="success"
                        size="small"
                        onClick={() => setAddSala(true)}
                      >
                        Adicionar
                      </MDButton>
                    ),
                  },
            ],
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

Sala.propTypes = {
  id: PropTypes.string.isRequired,
  escola: PropTypes.object.isRequired,
  setEscola: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Sala;
