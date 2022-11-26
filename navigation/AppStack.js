import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import {
  createNativeStackNavigator,
  NavigationContainer,
} from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import MainContainer from "./MainContainer";
import AuthStack from "./AuthStack";
import { Init } from "../components/context/Actions";
import EditProfile from "../screens/EditProfile";
import TopBar from "../components/TopBar";
import ProfileDetails from "../components/ProfileDetails";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);
  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Stack.Navigator>
      {token.length != 0 ? (
        <Stack.Screen
          name="HomeScreen"
          component={MainContainer}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      ) : (
        <Stack.Screen
          name="AuthScreen"
          component={AuthStack}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      )}
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false, gestureEnabled: false }}
      />
       <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
