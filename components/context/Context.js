import { createContext, useEffect, useReducer } from "react";
import * as SecureStore from 'expo-secure-store';
import Reducer from "./Reducer";
const getUser=async()=>{
    return await SecureStore.getItemAsync("user");
}
const getToken=async()=>{
    return await SecureStore.getItemAsync("token");
}
const INITIAL_STATE = {
  user: null,
  token: null,
  isFetching: false,
  error: false,
}
export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    const setData = async () => {
      await SecureStore.setItemAsync("user", JSON.stringify(state.user));
      await SecureStore.setItemAsync("token", JSON.stringify(state.token));
    };
    setData();
  }, [state.user, state.token]);
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
