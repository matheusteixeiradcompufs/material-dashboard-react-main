import { AuthContext } from "context/AuthContext";
import { useContext, useEffect } from "react";

/**
 * Componente para realizar o logout do usuário.
 * @module authentication/logout
 * @returns {void}
 */
function Logout() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    /**
     * Função assíncrona para realizar o logout.
     * @returns {Promise<void>}
     */
    const makeLogout = async () => {
      await logout();
    };

    makeLogout();
  }, []);

  // Não retorna nada explicitamente, apenas executa o logout
}

export default Logout;
