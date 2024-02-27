import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "services/apiClient";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";

function Telefone({ id, escola, setEscola, setLoading }) {
  const [addTelefone, setAddTelefone] = useState(false);
  const [numero, setNumero] = useState("");
  const handleSetNumero = (e) => {
    setNumero(e.target.value);
  };

  const handleCancelarTelefone = () => {
    setAddTelefone(false);
    setNumero("");
  };

  const handleSalvarTelefone = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/telefone/api/v1/", {
        numero: numero,
        escola: escola.id,
      });
      const response = await api.get(`/escolas/api/v1/${id}`);
      setEscola(response.data);
      setLoading(false);
      handleCancelarTelefone();
    } catch (error) {
      toast.error("Erro ao salvar telefone!");
      console.log("Erro ao salvar telefone!", error);
      setLoading(false);
    }
  };

  const handleExcluirTelefone = async (telefoneid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/telefone/api/v1/${telefoneid}`);
      const response = await api.get(`/escolas/api/v1/${id}`);
      setEscola(response.data);
      setLoading(false);
      setAddTelefone(false);
    } catch (error) {
      toast.error("Erro ao excluir telefone!");
      console.log("Erro ao excluir telefone!", error);
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
        bgColor="primary"
        borderRadius="lg"
        coloredShadow="primary"
      >
        <MDTypography variant="h6" color="white">
          Telefones
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns: [
              { Header: "Número", accessor: "numero", align: "left" },
              { Header: "", accessor: "excluir", align: "right" },
            ],
            rows: [
              ...escola.objetos_telefones.map((telefone) => ({
                numero: telefone.numero,
                excluir: (
                  <MDButton
                    variant="gradient"
                    color="error"
                    size="small"
                    onClick={() => handleExcluirTelefone(telefone.id)}
                  >
                    Excluir
                  </MDButton>
                ),
              })),
              addTelefone
                ? {
                    numero: (
                      <MDInput
                        type="number"
                        label="Número"
                        value={numero}
                        onChange={handleSetNumero}
                        fullWidth
                      />
                    ),
                    excluir: (
                      <MDBox display="flex" justifyContent="center">
                        <MDBox justifyContent="center">
                          <MDButton
                            variant="gradient"
                            color="success"
                            size="small"
                            onClick={handleSalvarTelefone}
                          >
                            Salvar
                          </MDButton>
                        </MDBox>
                        <MDBox justifyContent="center" ml={2}>
                          <MDButton
                            variant="gradient"
                            color="error"
                            size="small"
                            onClick={handleCancelarTelefone}
                          >
                            Cancelar
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    ),
                  }
                : {
                    numero: "",
                    excluir: (
                      <MDButton
                        variant="gradient"
                        color="success"
                        size="small"
                        onClick={() => setAddTelefone(true)}
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

Telefone.propTypes = {
  id: PropTypes.string.isRequired,
  escola: PropTypes.object.isRequired,
  setEscola: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Telefone;
