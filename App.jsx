import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './navigation/AuthNavigation'
import Home from './components/Home'
import Welcome from './screen/Welcome'

const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})