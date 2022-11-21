import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
export const Init = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem("token");
    if (token != null) {
      token = JSON.parse(token);
    }
    let user = await AsyncStorage.getItem("user");
    if (user != null) {
      user = JSON.parse(user);
    }
    if (token !== null) {
      dispatch({
        type: "LOGIN_SUCCESS",
        token: token,
        payload: user,
      });
    }
  };
};

export const Logout = () => {
  return async (dispatch) => {
    if (Platform.OS === "android") {
      await AsyncStorage.clear();
    }

    if (Platform.OS === "ios") {
      const asyncStorageKeys = await AsyncStorage.getAllKeys();
      AsyncStorage.multiRemove(asyncStorageKeys).then(()=>{
        dispatch({
          type: "LOGOUT",
        });
      })
    }
   
  };
};
