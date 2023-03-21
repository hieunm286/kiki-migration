import { createContext, useContext, useEffect, useState } from 'react';
import { setupAppContext } from 'src/context/AppContext.js';

export const appContext = createContext(undefined);

export function useAppContext() {
  const ac = useContext(appContext);
  if (!ac) {
    throw new Error('AppContext not available!');
  }
  return ac;
}

export function AppContextProvider({ children }) {
  const [context, setContext] = useState(undefined);

  useEffect(() => {
    setContext(setupAppContext());
  }, []);

  if (!context) {
    return null;
  }

  return <appContext.Provider value={context}>{children}</appContext.Provider>;
}
