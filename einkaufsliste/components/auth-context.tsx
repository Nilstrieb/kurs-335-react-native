import React, { useContext, useState } from "react";
import useAsyncStorage from "../service/use-async-storage";

type User = {
  token: string;
  username: string;
};

type Context = {
  user: User | null;
  setUser: (token: User | null) => void;
};

class EmptyDefault {
  get user(): User {
    throw new Error("Cannot get user of default value");
  }
  setUser() {
    throw new Error("Cannot set user of default value");
  }
}

const AuthContext = React.createContext<Context>(new EmptyDefault());

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [user, setUser] = useAsyncStorage<User | null>("user-token", null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useToken = (): Context => {
  return useContext(AuthContext);
};
