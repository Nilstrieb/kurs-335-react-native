import React, { useContext, useState } from "react";

type Context = {
  token: string | null;
  setToken: (token: string | null) => void;
};

class EmptyDefault {
  get token(): string {
    throw new Error("Cannot get token of default value");
  }
  setToken() {
    throw new Error("Cannot set token of default value");
  }
}

const AuthContext = React.createContext<Context>(new EmptyDefault());

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useToken = (): Context => {
  return useContext(AuthContext);
};
