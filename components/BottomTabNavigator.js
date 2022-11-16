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
import Icon from "react-native-vector-icons/MaterialIcons";
import Avatar from "./Avatar";

const BottomTabNavigator = ({navigation}) => {
    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.barItemView}>
                <Icon name='home' size={30} color='#3491ff'/>
            <Text style={{textAlign:'center'}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.barItemView}>
                <Icon name='person' size={30} color='#3491ff'/>
            <Text>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.barItemView}>
                <Avatar source={require("../assets/a3.png")}/>
            <Text>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.barItemView}>
                <Icon name='group' size={30} color='#3491ff'/>
            <Text>Groups</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.barItemView}>
                <Icon name='event' size={30} color='#3491ff'/>
            <Text>Events</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomBar: {
      backgroundColor: "#f0f0f0",
      width:'100%',
      height:60,
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:15,
      paddingVertical:5,
      alignItems:'center',
      //padding:10,
      //paddingLeft:10,
      //paddingRight:10,
    },
    barItemView:{
        color:'#3491ff',
       // marginTop:3,
    },
  });

export default BottomTabNavigator;

