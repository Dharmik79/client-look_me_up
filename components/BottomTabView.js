import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionic from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import Suggestions from "./Suggestions";
import Friends from "./Friends";
const BottomTabView = ({}) => {
  const Tab = createMaterialTopTabNavigator();



  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        tabBarLabelStyle: {
          color: "#ffffff",
          fontSize: 16,
          textTransform:'none',
          // backgroundColor:'grey',
        },
        tabBarStyle: {
          backgroundColor: "#a3a3a3",
          borderRadius: 10,
        },

        tabBarIndicatorStyle: {
          backgroundColor: "#3491ff",
          //color:'grey',
          borderRadius: 10,
          height: "100%",
          //borderColor: "#F0F0F0",
          //borderWidth: 4,
        },
        tabBarInactiveTintColor: {
          // color:"grey",
          backgroundColor: "grey",
        },
      }}
    >
      <Tab.Screen name="Friends" component={Friends} />
      <Tab.Screen name="Suggestions" component={Suggestions} />
    </Tab.Navigator>
  );
};
export default BottomTabView;
