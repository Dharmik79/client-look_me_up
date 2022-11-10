import React ,{useEffect} from "react";
import { View, Text,AsyncStorage, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  

  useEffect(async()=>{
    let getData = await AsyncStorage.getItem("User");
    console.log(JSON.parse(getData).token);
  },[])
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>

      <Button title="Login" onPress={()=>{navigation.navigate("AuthScreen",{
        screen:"LoginScreen"
      })}}></Button>
    </View>
  );
};

export default HomeScreen;
