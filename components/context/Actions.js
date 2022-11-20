import AsyncStorage from "@react-native-async-storage/async-storage";

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
