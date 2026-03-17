import { registerUser, loginUser, getMeUser, logoutUser } from "../service/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  async function handleRegister({ email, password, userType }) {
    const data = await registerUser({ email, password, userType });
    setUser(data.user);
  }

  async function handleLogin({ email, password }) {
    const data = await loginUser({ email, password });
    setUser(data.user);
  }

  async function handleGetMe() {
    try {
      const data = await getMeUser();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
};
