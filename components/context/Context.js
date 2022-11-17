import { createContext, useEffect, useReducer } from "react";
import {AsyncStorage} from "react-native"
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: AsyncStorage.getItem("user"),
  token:AsyncStorage.getItem("token"),
  isFetching: false,
  error: false
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(async() => {
    await AsyncStorage.setItem("user", JSON.stringify(state.user));
    await AsyncStorage.setItem("token", JSON.stringify(state.token));
  }, [state.user, state.token]);
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        token: state.token,
        dispatch
      }}
    >
      {children}
    </Context.Provider>
  );
};