import { createContext, ReactNode, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { api } from "services/apiClient";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    first_name: "",
    access: "",
    refresh: "",
  });
  const isAuthenticated = user.username !== "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const cookies = parseCookies(AuthContext);
      const username = cookies["@nextauth.username"];
      const first_name = cookies["@nextauth.first_name"];
      const access = cookies["@nextauth.access"];
      const refresh = cookies["@nextauth.refresh"];

      if (access) {
        try {
          const response = await api.post("/pessoas/me/", { username });
          const { objeto_usuario } = response.data;
          const { username, first_name } = objeto_usuario;

          setUser((prevUser) => ({
            ...prevUser,
            username: username,
            first_name: first_name,
            access: access,
            refresh: refresh,
          }));

          api.defaults.headers["Authorization"] = `Bearer ${access}`;
          setLoading(false);
        } catch (error) {
          logout();
          setLoading(false);
        }
      }
    };
    fetchUsername();
  }, []);

  async function obterTokens({ username, password }) {
    console.log("Tentando obter os tokens de acesso!");
    try {
      const response = await api.post("/api/token/", {
        username,
        password,
      });

      const { access, refresh } = await response.data;

      setCookie(AuthContext, "@nextauth.access", access, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie
      });
      setCookie(AuthContext, "@nextauth.refresh", refresh, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie
      });
      setUser((prevUser) => ({
        ...prevUser,
        access: access,
        refresh: refresh,
      }));

      api.defaults.headers["Authorization"] = `Bearer ${access}`;

      console.log("Tokens obtidos com sucesso!");
    } catch (error) {
      toast.error("Erro ao obter os tokens de acesso. Verifique suas credenciais!");
      console.error("Erro ao obter os tokens de acesso:", error);
    }
  }

  async function refreshToken() {
    console.log("Tentando atualizar o token de acesso!");
    try {
      const response = await api.post("/api/token/refresh/", {
        refresh: user.refresh,
      });

      const { access } = await response.data;

      setUser((prevUser) => ({
        ...prevUser,
        access: access,
      }));

      api.defaults.headers["Authorization"] = `Bearer ${access}`;

      setCookie(AuthContext, "@nextauth.access", access, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      console.log("Token de acesso atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar o token!");
      console.log("Erro ao atualizar o token:", error);

      if (error.response.status === 401) {
        toast.error("Sua sessão expirou. Faça login novamente.");
        await logout();
        navigate("/");
      }
    }
  }

  async function login({ username, password }) {
    setLoading(true);
    await obterTokens({ username, password });
    console.log("Tentando buscar os dados do usuário!");
    try {
      const response = await api.post("/pessoas/me/", {
        username,
      });
      const { objeto_usuario } = response.data;
      const { first_name } = objeto_usuario;

      setCookie(AuthContext, "@nextauth.username", username, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie
      });
      setCookie(AuthContext, "@nextauth.first_name", first_name, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie
      });

      setUser((prevUser) => ({
        ...prevUser,
        username: username,
        first_name: first_name,
      }));

      console.log("Dados do usuário obtidos com sucesso!");
      navigate("/");
    } catch (err) {
      toast.error("Erro ao acessar!");
      console.log("ERRO AO ACESSAR!", err);
      setLoading(false);
    }
  }

  async function logout() {
    try {
      destroyCookie(undefined, "@nextauth.username");
      destroyCookie(undefined, "@nextauth.first_name");
      destroyCookie(undefined, "@nextauth.access");
      destroyCookie(undefined, "@nextauth.refresh");
      setUser((prevUser) => ({
        ...prevUser,
        username: "",
        first_name: "",
        access: "",
        refresh: "",
      }));
      navigate("/");
    } catch {
      console.log("erro ao deslogar");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, setLoading, login, refreshToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
