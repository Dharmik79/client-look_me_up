import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
//   import { CheckBox } from "react-native-btr";
import Icon from "react-native-vector-icons/Feather";

const deviceHeight = Dimensions.get('window').height
export class BottomPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  show = () => {
    this.setState({ show: true });
  };
  close = () => {
    this.setState({ show: false });
  };

  renderOutsideTouchable(onTouch){
    const view = <View style={{flex:1,width:'100%'}}/>
    if (!onTouch) return view


    return(
        <TouchableWithoutFeedback onPress={onTouch} style={{flex:1, width:'100%'}}>
            {view}
        </TouchableWithoutFeedback>
    )
  }

  renderTitle = () => {
    const {title} = this.props
    return(
        <View>
        <Text style={{
            color:'#182e44',
            fontSize:20,
            fontWeight:'bold',
            margin:15,
        }}>
            {title}
        </Text>
    </View>
    )
  }

  renderContent = () => {
    const {data} = this.props
    return(
        <View>
            <FlatList
            style={{marginBottom:20}}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={this.renderItem}
            extraData={data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            contentContainerStyle={{
                paddingBottom:40,

            }}
            />
        </View>
    )
  }

  renderItem = () => {
    return(
        <View>
            <Text>Demo</Text>

        </View>
    )
  }

renderSeparator = () => {
    return(
        <View
        style={{}}>
opacity:0.1,
backgroundColor: '#182e44',
height:1,
        </View>
    )
}

  render() {
    let { show } = this.state;
    const {onTouchOutside,title} = this.props
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={true}
        onRequestClose={this.close}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#f0f0f0",
            justifyContent: "flex-end",
          }}
        >
            {this.renderOutsideTouchable(onTouchOutside)}
            <View style={{
                backgroundColor:'#3491ff',
                width:'100%',
                borderTopRightRadius:10,
                borderTopLeftRadius:10,
                paddingHorizontal:10,
                maxHeight: deviceHeight*0.4,
            }}>
{this.renderTitle()}
{this.renderContent()}

                {/* <View>
                    <Text style={{
                        color:'#182e44',
                        fontSize:20,
                        fontWeight:'bold',
                        margin:15,
                    }}>
                        {title}
                    </Text>
                </View> */}

            </View>
        </View>
      </Modal>
    );
  }
}
