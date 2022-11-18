import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./navigation/AuthStack";
import MainContainer from "./navigation/MainContainer";
import { ContextProvider } from "./components/context/Context";
const Stack = createNativeStackNavigator();
import { Context } from "./components/context/Context";

const App = () => {
  const { user, token, dispatch } = useContext(Context);
  console.log(token)
  return (
    <ContextProvider>
      <NavigationContainer>
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
      </NavigationContainer>
    </ContextProvider>
  );
};
export default App;
