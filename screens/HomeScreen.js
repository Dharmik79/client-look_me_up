import React, { useEffect } from "react";
import {
  View,
  Text,
  AsyncStorage,
  Button,
  BackHandler,
  Alert,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  useEffect(async () => {
    let getData = await AsyncStorage.getItem("User");
    const backPressed = () => {
      console.log("here");
      Alert.alert(
        "Exit App",
        "Do you want to exit?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Yes", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backPressed
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("AuthScreen", {
            screen: "LoginScreen",
          });
        }}
      ></Button>
    </View>
  );
};

export default HomeScreen;
