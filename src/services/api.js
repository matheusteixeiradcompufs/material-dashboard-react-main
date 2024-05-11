import axios from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";

// export const BASE_URL = "http://192.168.0.113";
export const BASE_URL = "http://127.0.0.1:8000";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${cookies["@seeduca.access"]}`,
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
          window.location.href = "/authentication/logout";
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    }
  );
  return api;
}
