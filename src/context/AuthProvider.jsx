import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authInfo = { user, setUser };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};
export default AuthProvider;
