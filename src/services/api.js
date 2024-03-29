import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { logout } from "../context/AuthContext";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
      Authorization: `Bearer ${cookies["@nextauth.access"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        // qualquer erro 401 (nao autorizado) devemos deslogar o usuario
        if (typeof window !== undefined) {
          // Chamar a funçao para deslogar o usuario
          // logout();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
