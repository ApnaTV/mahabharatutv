import React, { Component } from "react";
import { Button, Text, View, Dimensions, TextInput } from "react-native";
import Modal from "react-native-modal";
var { height, width } = Dimensions.get('window');
export default class TakePageNumber extends Component {
  state = {
    isModalVisible: false,
    title: '_/_',
    currentPage:'_'
  };

  componentDidMount = () => {
    this.setState({
      currentPage:this.props.currentPage
    });
  }

  toggleModal = () => {
    if(this.state.isModalVisible){
      this.props.goToPageNumber(this.state.currentPage);
    }
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  onChangeText = (text) => {
    if(text!=""){
      this.setState({
        currentPage:Number(text)
      });
    }
    else{
      this.setState({
        currentPage:text
      })
    }
    
  }
  render() {
    return (
      <View style={{ height: 15 }}>
        <Button title={this.props.currentPage + "/" + this.props.totalNumberOfPages} onPress={this.toggleModal} />
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{justifyContent:'space-around' ,height: 200, width: width * 0.85, backgroundColor: 'white', borderColor: "blue", borderRadius: 10, borderWidth: 4 }}>
              <Text style={{textAlign:'center'}}>Enter the page Number</Text>
              <View style={{flexDirection:'row',justifyContent:'center'}}>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1,width:30 }}
                onChangeText={text => this.onChangeText(text)}
                value={String(this.state.currentPage)}
                keyboardType="numeric"
              />
  <Text style={{fontSize:20}}> / {this.props.totalNumberOfPages}</Text>
              </View>
              <View style={{width:100,alignSelf:'center',borderRadius:10}}>
              <Button title="Done" onPress={this.toggleModal} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}