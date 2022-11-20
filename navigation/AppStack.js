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
const Stack = createNativeStackNavigator();

const AppStack = () => {
  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthScreen"
        component={AuthStack}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={MainContainer}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
