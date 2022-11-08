import React ,{useEffect} from "react";
import { View, Text,AsyncStorage } from "react-native";

const HomeScreen = ({ navigation }) => {
  

  useEffect(async()=>{
    let getData = await AsyncStorage.getItem("User");
    console.log(JSON.parse(getData).token);
  },[])
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
