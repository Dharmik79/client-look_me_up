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

const ProfileScreen = ({navigation}) => {
    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text 
            onPress={()=>navigation.navigate('Home')}
            style={{fontSize:26, fontWeight:'bold'}}
            >ProfileScreen</Text>
        </View>
    );
};

export default ProfileScreen;