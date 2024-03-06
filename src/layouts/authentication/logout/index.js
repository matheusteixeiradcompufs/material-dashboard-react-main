import { AuthContext } from "context/AuthContext";
import { useContext, useEffect } from "react";

function Logout() {
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    const makeLogout = async () => {
      await logout();
    };
    makeLogout();
  }, []);
}

export default Logout;
