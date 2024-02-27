import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "services/apiClient";
import PropTypes from "prop-types";

function Email({ id, escola, setEscola, setLoading }) {
  const [addEmail, setAddEmail] = useState(false);
  const [endereco, setEndereco] = useState("");

  const handleSetEndereco = (e) => {
    setEndereco(e.target.value);
  };

  const handleCancelarEmail = () => {
    setAddEmail(false);
    setEndereco("");
  };

  const handleSalvarEmail = async () => {
    setLoading(true);
    try {
      await api.post("/escolas/email/api/v1/", {
        endereco: endereco,
        escola: escola.id,
      });
      const response = await api.get(`/escolas/api/v1/${id}`);
      setEscola(response.data);
      setLoading(false);
      handleCancelarEmail();
    } catch (error) {
      toast.error("Erro ao salvar email!");
      console.log("Erro ao salvar email!", error);
      setLoading(false);
    }
  };

  const handleExcluirEmail = async (emailid) => {
    setLoading(true);
    try {
      await api.delete(`/escolas/email/api/v1/${emailid}`);
      const response = await api.get(`/escolas/api/v1/${id}`);
      setEscola(response.data);
      setLoading(false);
      setAddEmail(false);
    } catch (error) {
      toast.error("Erro ao excluir email!");
      console.log("Erro ao excluir email!", error);
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
        bgColor="secondary"
        borderRadius="lg"
        coloredShadow="secondary"
      >
        <MDTypography variant="h6" color="white">
          Emails
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        <DataTable
          table={{
            columns: [
              { Header: "Endereço", accessor: "endereco", align: "left" },
              { Header: "", accessor: "excluir", align: "right" },
            ],
            rows: [
              ...escola.objetos_emails.map((email) => ({
                endereco: email.endereco,
                excluir: (
                  <MDButton
                    variant="gradient"
                    color="error"
                    size="small"
                    onClick={() => handleExcluirEmail(email.id)}
                  >
                    Excluir
                  </MDButton>
                ),
              })),
              addEmail
                ? {
                    endereco: (
                      <MDInput
                        type="email"
                        label="Endereço"
                        value={endereco}
                        onChange={handleSetEndereco}
                      />
                    ),
                    excluir: (
                      <MDBox display="flex" justifyContent="center">
                        <MDBox justifyContent="center">
                          <MDButton
                            variant="gradient"
                            color="success"
                            size="small"
                            onClick={handleSalvarEmail}
                          >
                            Salvar
                          </MDButton>
                        </MDBox>
                        <MDBox justifyContent="center" ml={2}>
                          <MDButton
                            variant="gradient"
                            color="error"
                            size="small"
                            onClick={handleCancelarEmail}
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
                        onClick={() => setAddEmail(true)}
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

Email.propTypes = {
  id: PropTypes.string.isRequired,
  escola: PropTypes.object.isRequired,
  setEscola: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default Email;
