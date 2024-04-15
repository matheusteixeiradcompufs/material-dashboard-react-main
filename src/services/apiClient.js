import { AuthContext } from "context/AuthContext";
import { setupAPIClient } from "./api";

export const api = setupAPIClient(AuthContext);
