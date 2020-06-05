import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Animated , ScrollView, TouchableHighlightBase} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { SharedElement } from 'react-navigation-shared-element';
import { Easing } from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
 
export default class detailView extends Component {
  constructor(props){
    super(props)
    this.state = {
      content : props.route.params.content,
      scrollY : new Animated.Value(0),
      rotateValue : new Animated.Value(0),
      visibility: {
        opacity : 1,
      },
      fillVisibility : {
        opacity : 0,
      },
      darkMode : this.props.darkMode,
      bgColor : "",
      textcolor : "",
    }
  }

  // shouldComponentUpdate(nextprops, state)
  // {   
           
  //   if(nextprops){
  //     console.log(nextprops);
  //     if(nextprops.darkMode)
  //     {
  //         this.setState({
  //           darkMode: nextprops.darkMode,
  //           bgColor : "#282828",
  //           textcolor : "white",
  //         })
  //         console.log("light mode from details")
  //     }
  //     else{
  //       this.setState({
  //         darkMode: nextprops.darkMode,
  //         bgColor : "#C3C1C1",
  //         textcolor : "black",
  //       })
  //       console.log("light mode from details")
  //     }
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
  componentDidMount()
  {
    console.log(this.props)
    if(this.props.darkMode)
    {
        this.setState({
          darkMode: this.props.darkMode,
          bgColor : "#282828",
          textcolor : "white",
        })
        console.log("light mode from dtsils")
    }
    else{
      this.setState({
        darkMode: this.props.darkMode,
        bgColor : "#C3C1C1",
        textcolor : "black",
      })
      console.log("dark from dtsils")
    }
  }
  render() {
    const { navigate } = this.props.navigation
    const rotateInterpolator = this.state.scrollY.interpolate({
      inputRange : [0,450],
      outputRange: ['rgba(77, 74, 74, 0)', 'rgba(77, 74, 74, 1)'],
    });
    const bookmarkFunction = () => {
      AsyncStorage.setItem(
        this.state.content.uri.toString(),
        JSON.stringify(this.state.content),
      ).then(
        this.setState({
          visibility: {
            opacity :0,
          },
          fillVisibility: {
            opacity :1,
          }
        })
      )
    }
    return (
      <View>
          <Animated.View style={[styles.header, {backgroundColor : rotateInterpolator}]}>
            <FontAwesome5 style={{flex:1,marginLeft:20,marginTop:10}} onPress={() => this.props.navigation.goBack()} name="arrow-left" size={20} color={"white"} />
            <Text style={[{fontSize:20,color:"white",flex:8,marginTop:8}]}>Back</Text>
            <FontAwesome5 style={[{flex:1,marginTop:10},this.state.visibility]} onPress={bookmarkFunction} name="bookmark" size={20} color={"white"} />
            <MaterialIcons style={[{flex:1,marginTop:10,marginLeft:-40},this.state.fillVisibility]} onPress={bookmarkFunction} name="bookmark" size={24} color={"white"} />
          </Animated.View>
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: {
            contentOffset: {
              y: this.state.scrollY
            }
          }
        }],
        {  useNativeDriver : false,
          },
        )
      }      
      style={{backgroundColor:this.state.bgColor,top:0,marginTop: -60}}
      >
         
          
          <SharedElement id={this.state.content.uri}>
          <Image style={styles.banner} source={{uri: this.state.content.image}}/>
          </SharedElement>
          <Text style={styles.heading}>
            {this.state.content.title}
         </Text>
          <Text style={[styles.content, {color: this.state.textcolor}]}>
            {this.state.content.body}
          </Text>
       </ScrollView>

       </View>
    )
  }
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles =  StyleSheet.create({
  banner : {
    width : width,
    height : height - 240,
    zIndex: 1,
    marginTop: -100,

  },
  header : {
    flexDirection:'row',
    top:0,
    padding: 10,
    height: 60,
    zIndex : 200,
  },
  heading: {
    fontSize: 20,
    marginLeft: 20,
    marginTop : 22,
    color: "#C9BFF2",
    fontFamily: "sans-serief",
  },
  content: {
    margin : 10,
    marginTop : 22,
    marginLeft: 20,
    fontSize: 19,
    textAlign: 'left',
    fontFamily: 'Numans-Regular',
  }
})