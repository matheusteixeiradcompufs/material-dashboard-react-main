import { Card, Grid, Link } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import Funcao from "../Funcao";

function Edit({
  funcionario,
  grupos,
  grupo,
  nome,
  sobrenome,
  email,
  usuario,
  matricula,
  cpf,
  dataNascimento,
  endereco,
  formacao,
  retrato,
  handleSetGrupo,
  handleSetNome,
  handleSetSobrenome,
  handleSetEmail,
  handleSetUsuario,
  handleSetMatricula,
  handleSetCpf,
  handleSetDataNascimento,
  handleSetEndereco,
  handleSetFormacao,
  handleFile,
  handleEditar,
  handleOnListarFuncionario,
}) {
  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="warning"
        borderRadius="lg"
        coloredShadow="warning"
      >
        <MDTypography variant="h6" color="white">
          Editar Funcionario
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDBox px={2} color="info" display="flex" justifyContent="center">
              <Funcao value={grupo} onChange={handleSetGrupo} groups={grupos} />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <MDInput label="Nome" type="text" value={nome} onChange={handleSetNome} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              label="Sobrenome"
              type="text"
              value={sobrenome}
              onChange={handleSetSobrenome}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput label="Email" type="email" value={email} onChange={handleSetEmail} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <MDInput
              label="Usuário"
              type="text"
              value={usuario}
              onChange={handleSetUsuario}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <MDInput label="Senha" type="password" fullWidth disabled />
          </Grid>
          <Grid item xs={4}>
            <MDInput
              label="Matrícula"
              type="text"
              value={matricula}
              onChange={handleSetMatricula}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <MDInput label="CPF" type="text" value={cpf} onChange={handleSetCpf} fullWidth />
          </Grid>
          <Grid item xs={4}>
            <MDInput
              label="Data"
              type="date"
              value={dataNascimento}
              onChange={handleSetDataNascimento}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              label="Endereço"
              type="text"
              multiline
              rows={2}
              value={endereco}
              onChange={handleSetEndereco}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              label="Formação"
              type="text"
              multiline
              rows={3}
              value={formacao}
              onChange={handleSetFormacao}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {retrato && (
              <MDBox px={1} display="flex" flexDirection="row">
                <MDTypography variant="h6" mr={1}>
                  Atualmente:
                </MDTypography>
                <Link href={retrato} underline="hover" variant="body2">
                  {retrato}
                </Link>
              </MDBox>
            )}
            <MDInput type="file" accept="image/png, image/jpg" onChange={handleFile} fullWidth />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mb={2} display="flex" flexDirection="row" justifyContent="center">
        <MDBox mr={1}>
          <MDButton variant="gradient" color="success" onClick={() => handleEditar(funcionario.id)}>
            Salvar
          </MDButton>
        </MDBox>
        <MDBox ml={1}>
          <MDButton variant="gradient" color="error" onClick={handleOnListarFuncionario}>
            Cancelar
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

Edit.propTypes = {
  funcionario: PropTypes.object.isRequired,
  grupos: PropTypes.array.isRequired,
  grupo: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  sobrenome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  usuario: PropTypes.string.isRequired,
  matricula: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  dataNascimento: PropTypes.object.isRequired,
  endereco: PropTypes.string.isRequired,
  formacao: PropTypes.string.isRequired,
  retrato: PropTypes.string.isRequired,
  handleSetGrupo: PropTypes.func.isRequired,
  handleSetNome: PropTypes.func.isRequired,
  handleSetSobrenome: PropTypes.func.isRequired,
  handleSetEmail: PropTypes.func.isRequired,
  handleSetUsuario: PropTypes.func.isRequired,
  handleSetMatricula: PropTypes.func.isRequired,
  handleSetCpf: PropTypes.func.isRequired,
  handleSetDataNascimento: PropTypes.func.isRequired,
  handleSetEndereco: PropTypes.func.isRequired,
  handleSetFormacao: PropTypes.func.isFormacao,
  handleFile: PropTypes.func.isRequired,
  handleEditar: PropTypes.func.isRequired,
  handleOnListarFuncionario: PropTypes.func.isRequired,
};

export default Edit;
