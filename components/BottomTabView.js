import React, { useState } from "react";
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
import commonApi from "../api/common";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomTabView = ({}) => {
  const user = useSelector((state) => state.Reducers.user);
  const token = useSelector((state) => state.Reducers.token);

  const Tab = createMaterialTopTabNavigator();
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState([]);
  const [friends, setFriends] = useState([]);
  const getFollowers = async () => {
    await commonApi({
      action: "followers",
      data: {
        options: {
          select: ["fullName", "following", "followers","profilePicture"],
        },
      },
      config: {
        authToken: token,
      },
    }).then(({ DATA }) => {
      setFollowers(DATA.data);
    });
  };

  const fetchFriends = async () => {
    await commonApi({
      action: "friends",
      data: {
        options: {
          select: ["fullName", "following", "followers","profilePicture"],
        },
      },
      config: {
        authToken: token,
      },
    }).then(({ DATA }) => {
      setFriends(DATA.data);
    });
  };
  const getProfile = async () => {
    await commonApi({
      action: "getProfile",
      config: {
        authToken: token,
      },
    }).then(async({ DATA }) => {
      dispatch({ type: "UPDATE_USER", payload: DATA });
      await AsyncStorage.setItem("user",JSON.stringify(DATA))
    });
  };
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        tabBarLabelStyle: {
          color: "#ffffff",
          fontSize: 16,
          textTransform: "none",
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
      <Tab.Screen
        name="Friend"
        children={() => (
          <Friends
            friends={friends}
            fetchFriends={fetchFriends}
            getProfile={getProfile}
          />
        )}
        options={{title:"Friends"}}
      />
      <Tab.Screen
        name="Followers"
        children={() => (
          <Suggestions
            followers={followers}
            getFollowers={getFollowers}
            getProfile={getProfile}
          />
        )}
      />
    </Tab.Navigator>
  );
};
export default BottomTabView;
