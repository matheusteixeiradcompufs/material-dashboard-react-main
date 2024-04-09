import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "services/apiClient";

const GraficoEscolas = () => {
  const [escolas, setEscolas] = useState([]);
  const currentYear = new Date().getFullYear(); // Obtém o ano atual

  useEffect(() => {
    const fetchEscolas = async () => {
      try {
        const response = await api.get(`/escolas/api/v1/`);
        setEscolas(response.data);
      } catch (error) {
        toast.error("Erro ao carregar escolas!");
        console.log("Erro ao carregar escolas!", error);
      }
    };

    fetchEscolas();

    // Função de limpeza
    return () => {
      // Se necessário, faça a limpeza aqui
    };
  }, []);

  // Gerar os anos de 2022 até o ano atual
  const anos = Array.from({ length: currentYear - 2021 }, (_, index) => 2022 + index);

  // Contar o número de escolas para cada ano
  const dadosEscolas = anos.map((ano) => {
    return escolas.filter((objeto) => {
      const criadoEmAno = new Date(objeto.criado_em).getFullYear();
      return criadoEmAno === ano;
    }).length;
  });

  return {
    graficoEscolas: {
      labels: anos.map(String),
      datasets: {
        label: "Escolas",
        data: dadosEscolas,
      },
    },
  };
};

export default GraficoEscolas;
