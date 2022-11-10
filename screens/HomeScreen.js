import React from 'react'
import {View, Text, StyleSheet,StatusBar, ScrollView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import TopBar from '../components/TopBar'
import CreatePost from '../components/CreatePost'
import GroupsHome from './GroupsHome'

const HomeScreen = () => {
    return(
        // <KeyboardAwareScrollView>
        // <>
        // <StatusBar backgroundColor="#ffffff"
        // barStyle="dark-content">
            <View style={styles.container}>
                <ScrollView>
                <TopBar/>
                <CreatePost/>
                <GroupsHome/>
                </ScrollView>

        </View>
        // {/* </StatusBar> */}
        // </>
        // </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      marginTop: 35,
      //padding:10,
      paddingLeft:10,
      paddingRight:10,
    
    },
  
});

export default HomeScreen