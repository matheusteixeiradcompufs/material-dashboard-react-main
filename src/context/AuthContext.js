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
    // tentar pegar algo no cookie
    const cookies = parseCookies(AuthContext);
    const username = cookies["@nextauth.username"];
    const first_name = cookies["@nextauth.first_name"];
    const access = cookies["@nextauth.access"];
    const refresh = cookies["@nextauth.refresh"];

    if (access) {
      api
        .post("/pessoas/me/", { username })
        .then((response) => {
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
        })
        .catch(() => {
          //Se deu erro deslogamos o user.
          logout();
        });
    }
  }, []);

  async function obterTokens({ username, password }) {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao obter os tokens de acesso. Verifique suas credenciais!");
      console.error("Erro ao obter os tokens de acesso:", error);
      setLoading(false);
    }
  }

  async function refreshToken() {
    setLoading(true);
    try {
      const response = await api.post("/api/token/", {
        access,
      });

      if (!response.ok) {
        throw new Error("Falha ao atualizar o token");
      }

      const { access } = await response.data;

      // Atualiza o token de acesso
      setUser((prevUser) => ({
        ...prevUser,
        access: access,
      }));

      // Atualiza o token de acesso nos cabeçalhos da API
      api.defaults.headers["Authorization"] = `Bearer ${access}`;

      // Salva o novo token de acesso no AsyncStorage
      setCookie(AuthContext, "@nextauth.access", newAccessToken, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie
      });
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao atualizar o token!");
      console.error("Erro ao atualizar o token:", error);
      // Se houver um erro 401, significa que tanto o token de acesso quanto o token de refresh estão expirados
      if (error) {
        alert("Sua sessão expirou. Faça login novamente.");
      }
      setLoading(false);
      await logout();
    }
  }

  async function login({ username, password }) {
    await obterTokens({ username, password });
    setLoading(true);
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

      setLoading(false);
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
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
