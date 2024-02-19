import { createContext, ReactNode, useState, useEffect } from "react";

import PropTypes from "prop-types";

import { api } from "services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies";

import { toast } from "react-toastify";

export const AuthContext = createContext({});

export function logout() {
  try {
    destroyCookie(undefined, "@nextauth.username");
    destroyCookie(undefined, "@nextauth.first_name");
    destroyCookie(undefined, "@nextauth.access");
    destroyCookie(undefined, "@nextauth.refresh");
    window.location.href = "/authentication/login";
  } catch {
    console.log("erro ao deslogar");
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    username: "",
    first_name: "",
    access: "",
    refresh: "",
  });
  const isAuthenticated = !!user;

  useEffect(() => {
    // tentar pegar algo no cookie
    const { "@nextauth.username": username } = parseCookies();
    const { "@nextauth.first_name": first_name } = parseCookies();
    const { "@nextauth.acess": access } = parseCookies();
    const { "@nextauth.refresh": refresh } = parseCookies();

    if (access) {
      api
        .post("/pessoas/me", { username })
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
          // logout();
        });
    }
  }, []);

  async function obterTokens({ username, password }) {
    try {
      const response = await api.post("/api/token/", {
        username,
        password,
      });

      const { access, refresh } = await response.data;

      setCookie(undefined, "@nextauth.access", access, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie
      });
      setCookie(undefined, "@nextauth.refresh", refresh, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie
      });
      setUser((prevUser) => ({
        ...prevUser,
        access: access,
        refresh: refresh,
      }));

      api.defaults.headers["Authorization"] = `Bearer ${access}`;
    } catch (error) {
      console.error("Erro ao obter os tokens de acesso:", error);
      alert("Erro ao obter os tokens de acesso. Verifique suas credenciais.");
    }
  }

  async function refreshToken() {
    try {
      const response = await api.post("/api/token/", {
        access,
      });

      if (!response.ok) {
        throw new Error("Falha ao atualizar o token");
      }

      const data = await response.json();
      const newAccessToken = data.access;
      // Atualiza o token de acesso
      setUser((prevUser) => ({
        ...prevUser,
        access: newAccessToken,
      }));

      // Atualiza o token de acesso nos cabeçalhos da API
      api.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;

      // Salva o novo token de acesso no AsyncStorage
      setCookie(undefined, "@nextauth.access", newAccessToken, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie
      });
    } catch (error) {
      console.error("Erro ao atualizar o token:", error);

      // Se houver um erro 401, significa que tanto o token de acesso quanto o token de refresh estão expirados
      if (error) {
        alert("Sua sessão expirou. Faça login novamente.");
      }
    }
  }

  async function login({ username, password }) {
    await obterTokens({ username, password });

    try {
      const response = await api.post("/pessoas/me/", {
        username,
      });
      const { objeto_usuario } = response.data;
      const { first_name } = objeto_usuario;

      setCookie(undefined, "@nextauth.username", username, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie
      });
      setCookie(undefined, "@nextauth.first_name", first_name, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // Quais caminhos terao acesso ao cookie
      });

      setUser((prevUser) => ({
        ...prevUser,
        username: username,
        first_name: first_name,
      }));

      toast.success("Logado com sucesso!");

      //Redirecionar o user para /dashboard
      // window.location.href = "/dashboard";
    } catch (err) {
      toast.error("Erro ao acessar!");
      console.log("ERRO AO ACESSAR ", err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
