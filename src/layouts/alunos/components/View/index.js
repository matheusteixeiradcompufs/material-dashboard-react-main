import { Card, Grid, Link } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function View({
  nome,
  sobrenome,
  email,
  usuario,
  matricula,
  cpf,
  dataNascimento,
  endereco,
  retrato,
  handleSetNome,
  handleSetSobrenome,
  handleSetEmail,
  handleSetUsuario,
  handleSetMatricula,
  handleSetCpf,
  handleSetDataNascimento,
  handleSetEndereco,
  handleFile,
  handleOnEditarAluno,
  handleOnListarAluno,
}) {
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
          Detalhes do Aluno
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDInput
              label="Nome"
              type="text"
              value={nome}
              onChange={handleSetNome}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              label="Sobrenome"
              type="text"
              value={sobrenome}
              onChange={handleSetSobrenome}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              label="Email"
              type="email"
              value={email}
              onChange={handleSetEmail}
              fullWidth
              disabled
            />
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
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <MDInput
              label="CPF"
              type="text"
              value={cpf}
              onChange={handleSetCpf}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <MDInput
              label="Data"
              type="date"
              value={dataNascimento}
              onChange={handleSetDataNascimento}
              fullWidth
              disabled
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
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <MDBox px={1} display="flex" flexDirection="row">
              <MDTypography variant="h6" mr={1}>
                Atualmente:
              </MDTypography>
              {retrato && (
                <Link href={retrato} underline="hover" variant="body2">
                  {retrato}
                </Link>
              )}
            </MDBox>
            <MDInput
              type="file"
              accept="image/png, image/jpg"
              onChange={handleFile}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mb={2} display="flex" flexDirection="row" justifyContent="center">
        <MDBox mr={1}>
          <MDButton variant="gradient" color="info" onClick={handleOnEditarAluno}>
            Modificar
          </MDButton>
        </MDBox>
        <MDBox ml={1}>
          <MDButton variant="gradient" color="error" onClick={handleOnListarAluno}>
            Voltar
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

View.propTypes = {
  nome: PropTypes.string.isRequired,
  sobrenome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  usuario: PropTypes.string.isRequired,
  matricula: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  dataNascimento: PropTypes.object.isRequired,
  endereco: PropTypes.string.isRequired,
  retrato: PropTypes.string.isRequired,
  handleSetNome: PropTypes.func.isRequired,
  handleSetSobrenome: PropTypes.func.isRequired,
  handleSetEmail: PropTypes.func.isRequired,
  handleSetUsuario: PropTypes.func.isRequired,
  handleSetMatricula: PropTypes.func.isRequired,
  handleSetCpf: PropTypes.func.isRequired,
  handleSetDataNascimento: PropTypes.func.isRequired,
  handleSetEndereco: PropTypes.func.isRequired,
  handleFile: PropTypes.func.isRequired,
  handleOnEditarAluno: PropTypes.func.isRequired,
  handleOnListarAluno: PropTypes.func.isRequired,
};

export default View;
