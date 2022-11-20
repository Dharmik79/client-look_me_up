import React, { useContext } from "react";
import { View, Text } from "react-native";
import {
  createNativeStackNavigator,
  NavigationContainer,
} from "@react-navigation/native-stack";
import { Context } from "../components/context/Context";

import MainContainer from "./MainContainer";
import AuthStack from "./AuthStack";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { user, token, dispatch } = useContext(Context);
  console.log(token);
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
