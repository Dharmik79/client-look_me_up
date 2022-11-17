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

const FriendsScreen = ({navigation}) => {
    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text 
        onPress={()=>navigation.navigate('Home')}
        style={{fontSize:26, fontWeight:'bold'}}
        >FriendsScreen</Text>
    </View>
    );
};

export default FriendsScreen;