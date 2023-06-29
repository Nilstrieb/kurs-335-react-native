import React, { useContext, useState } from "react";
import useAsyncStorage from "../service/use-async-storage";

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
  const [token, setToken] = useAsyncStorage<string | null>("user-token", null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useToken = (): Context => {
  return useContext(AuthContext);
};
