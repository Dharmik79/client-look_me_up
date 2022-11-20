import AsyncStorage from "@react-native-async-storage/async-storage";

export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log('token fetched');
      dispatch({
        type: 'LOGIN',
        payload: token,
      })
    }
  }
}


export const LoginStart = () => ({
    type: "LOGIN_START"
  });
  
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
  });
  
  export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
  });
  
  export const Logout = () => ({
    type: "LOGOUT"
  });