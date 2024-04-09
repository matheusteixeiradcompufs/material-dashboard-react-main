import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "services/apiClient";

const GraficoAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const currentYear = new Date().getFullYear(); // Obtém o ano atual

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.get(`/pessoas/aluno/api/v1/`);
        setAlunos(response.data);
      } catch (error) {
        toast.error("Erro ao carregar turmas!");
        console.log("Erro ao carregar turmas!", error);
      }
    };

    fetchAlunos();

    // Função de limpeza
    return () => {
      // Se necessário, faça a limpeza aqui
    };
  }, []);

  // Gerar os anos de 2022 até o ano atual
  const anos = Array.from({ length: currentYear - 2021 }, (_, index) => 2022 + index);

  // Contar o número de turmas para cada ano
  const dadosAlunos = anos.map(
    (ano) =>
      alunos.filter((aluno) =>
        aluno.objetos_boletins.some((boletim) => boletim.objeto_turma.ano === ano)
      ).length
  );

  return {
    graficoAlunos: {
      labels: anos.map(String),
      datasets: {
        label: "Alunos",
        data: dadosAlunos,
      },
    },
  };
};

export default GraficoAlunos;
