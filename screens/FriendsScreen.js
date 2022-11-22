import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome5";
import BottomTabView from "../components/BottomTabView";

const FriendsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Icon
          name="user-friends"
          size="25"
          color={"#3491ff"}
          style={{ marginRight: 10 }}
        />
        <Text
          onPress={() => navigation.navigate("Home")}
          style={{ fontSize: 26, fontWeight: "bold" }}
        >
          Friends
        </Text>
      </View>
      
      <View style={{ padding: 5 }}>
        <View style={styles.category}>
          <BottomTabView />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    //padding: 5,
    marginTop: 35,
    backgroundColor: "#ffffff",

    //marginBottom: 10,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
  },
  separator: {
    width: "100%",
    height: 2,
    //marginTop: 8,
    marginBottom: 8,
    backgroundColor: "grey",
  },
  category: {
    marginBottom: 10,
   // backgroundColor: "grey",
    borderRadius: 10,
    //padding: 5,
    height: '100%',
    //flexDirection: "row",
  },

});
export default FriendsScreen;
