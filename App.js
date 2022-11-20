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
import AppStack from "./navigation/AppStack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./components/context/Context";
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
