import { createContext, useContext } from "react";
import { ContextType, ClientEnvType } from "../../types/ui";

const EnvContext = createContext<ContextType>(undefined);

export const Provider = EnvContext.Provider;

export const useEnv = (): ClientEnvType => {
  const value: ContextType = (useContext(EnvContext) || {}) as ContextType;
  return value.env;
}

export function withEnv<T>(Component: React.FC<T>) {
  return ({ env, ...props }: { env: ClientEnvType } & T) => {
    return <EnvContext.Provider value={{ env }}>
      {/* @ts-ignore */}
      <Component {...props} />
    </EnvContext.Provider>;
  }
}