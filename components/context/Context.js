import { createContext, useEffect, useReducer } from "react";
import { AsyncStorage } from "react-native";
import Reducer from "./Reducer";
const getUser=async()=>{
    return await JSON.parse(AsyncStorage.getItem("user"));
}
const getToken=async()=>{
    return await JSON.parse(AsyncStorage.getItem("token"));
}
const INITIAL_STATE = {
  user: getUser(),
  token: getToken(),
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    const setData = async () => {
      await AsyncStorage.setItem("user", JSON.stringify(state.user));
      await AsyncStorage.setItem("token", JSON.stringify(state.token));
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
