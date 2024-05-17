import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../components/Home';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screen/Welcome';
import RecipieDetails from '../screen/RecipieDetails';


const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="RecipieDetails" component={RecipieDetails} />

    </Stack.Navigator>
  )
}

export default AuthNavigation

