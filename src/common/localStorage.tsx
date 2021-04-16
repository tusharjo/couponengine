import React, { useReducer, useEffect, useContext } from "react";

type ContextProps = {
  apiStore: any;
  setAPIStore: any;
};

export const appConstants = {
  API_STORAGE: "ce-local-api-store",
};


export let reducer = (info: any, newInfo: any) => {
  if (newInfo === null) {
    localStorage.removeItem(appConstants.API_STORAGE);
    return {};
  }
  return { ...info, ...newInfo };
};

export const ceAPIStore = JSON.parse(
  localStorage.getItem(appConstants.API_STORAGE) as any
);
const StorageContext = React.createContext({} as ContextProps);

export const useStorage = () => {
  const { apiStore, setAPIStore } = useContext(StorageContext);
  return { apiStore, setAPIStore };
}

export function StorageProvider(props: any) {
  const [apiStore, setAPIStore] = useReducer(
    reducer,
    ceAPIStore || ({} as any)
  );

  useEffect(() => {
    localStorage.setItem(appConstants.API_STORAGE, JSON.stringify(apiStore));
  }, [apiStore]);


  return (
    <StorageContext.Provider
      value={{ apiStore, setAPIStore }}
    >
      {props.children}
    </StorageContext.Provider>
  );
}