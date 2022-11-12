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
//   import { CheckBox } from "react-native-btr";
import Icon from "react-native-vector-icons/Feather";


const Avatar = ({source}) => {
    return (
    <View style={styles.container}>
      <Image style={styles.image} source={source} />
    </View>
    )
  };
  
  const styles = StyleSheet.create({
    container: {
      //flex: 1,
      width: 40,
      height: 40,
     
      //backgroundColor: "#3491ff",
    },
    image:{
      
      width:'100%',
      height:'100%',
      borderRadius:20,
      //padding:10,
      //alignItems:'center',
      borderColor:'#ffffff',
      borderWidth:2,
  },
  });
  
  export default Avatar;