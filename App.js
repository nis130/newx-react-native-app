/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {NavigationContainer} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import HomeView from './screens/home';
import settingsScreen from './screens/settings';
import SplashScreen from 'react-native-splash-screen'
import React from 'react';
import {
  StyleSheet, PermissionsAndroid
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'



//registerScreens();
const Tab = createBottomTabNavigator();

function MyTabs() {

  
  return (
    <Tab.Navigator
      tabBarOptions= {{
        inactiveBackgroundColor: '#4D4A4A',
        activeTintColor : 'cyan',
        inactiveTintColor: 'white',
        activeBackgroundColor: '#4D4A4A',
      }}
    
    >
      <Tab.Screen 
        name="Home" 
        component={HomeView} 
        options = {{
          tabBarLabel: "Home",
          tabBarIcon : ({color,size}) => (
            <FontAwesome5  name="newspaper" color={color} size={size} />
          )
        }}
      />
      {/* <Tab.Screen 
        name="Sports" 
        component={sportScreen} 
        options = {{
          tabBarLabel: 'sports',
          tabBarIcon : ({color,size}) => (
            <FontAwesome5 name="table-tennis" color={color} size={size} />
          )
        }}
      /> */}
      <Tab.Screen 
        name="settings" 
        component={settingsScreen} 
        initialParams={{key : 2}}
        options = {{
          tabBarLabel : "Offline",
          tabBarIcon : ({color,size}) => (
            <FontAwesome5 name="bookmark" size={size} color={color}/>
          )
        }}
        />
    </Tab.Navigator>
  );
}


const App: () => React$Node = () => {
  React.useEffect(() => {
    SplashScreen.hide()
  })
  return (
      <NavigationContainer>
        <MyTabs/>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  custom : {
    flex :1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cyan',
  }
});

export default App;
