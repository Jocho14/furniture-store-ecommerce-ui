import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { accountBasicInfo } from "@/api/client/account";
import { AccountBasicInfoDto } from "@/interfaces/account";

interface AuthContextType {
  account: AccountBasicInfoDto;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    data: authStatusData,
    isLoading: authStatusLoading,
    isError,
  } = useQuery({
    queryKey: ["authStatus"],
    queryFn: accountBasicInfo,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  console.log("auth status data from context: ", authStatusData);
  const account = authStatusData;

  return (
    <AuthContext.Provider value={{ account, loading: authStatusLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
