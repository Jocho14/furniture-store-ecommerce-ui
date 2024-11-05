import React, { createContext, useContext, useState, useCallback } from "react";

type HeaderMode = "list" | "add" | "edit";

interface HeaderContextType {
  mode: HeaderMode;
  setMode: (mode: HeaderMode) => void;
  save?: () => void;
  setSaveFunction: (saveFn: () => void) => void;
  deactivate?: () => void;
  setDeactivateFunction: (deleteFn: () => void) => void;
}

interface HeaderProviderProps {
  children: React.ReactNode;
}

const HeaderContext = createContext<HeaderContextType | undefined>({
  mode: "list",
  setMode: () => {},
  setSaveFunction: () => {},
  setDeactivateFunction: () => {},
});

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<HeaderMode>("list");
  const [save, setSaveFunction] = useState<() => void>(() => () => {});
  const [deactivate, setDeactivateFunction] = useState<() => void>(
    () => () => {}
  );

  return (
    <HeaderContext.Provider
      value={{
        mode,
        setMode,
        save,
        setSaveFunction,
        deactivate,
        setDeactivateFunction,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
