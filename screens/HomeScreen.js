import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import TopBar from "../components/TopBar";
import CreatePost from "../components/CreatePost";
import GroupsHome from "./GroupsHome";
import Story from "../components/Story";
import Post from "../components/Post";
import BottomTabNavigator from "../components/BottomTabNavigator";

const HomeScreen = ({ navigation }) => {
  return (
    // <KeyboardAwareScrollView>
    // <>
    // <StatusBar backgroundColor="#ffffff"
    // barStyle="dark-content">
    <View style={styles.container}>
      <ScrollView>
        <TopBar />
        <CreatePost />
        <Story />
        <GroupsHome />
        <Post />
        {/* <SafeAreaView
          style={styles.bottomNavigation}
        >
          <BottomTabNavigator />
        </SafeAreaView> */}
      </ScrollView>
    </View>
    // {/* </StatusBar> */}
    // </>
    // </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 35,
    //padding:10,
    //paddingLeft:10,
    //paddingRight:10,
  },
  bottomNavigation: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#3491ff",
  },
});

export default HomeScreen;
