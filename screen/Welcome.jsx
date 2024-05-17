import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
const Welcome = () => {
    const navigation = useNavigation()
    const ring1padding = useSharedValue(0)
    const ring2padding = useSharedValue(0)

    useEffect(()=>{
        ring1padding.value = 0
        ring2padding.value = 0
        setTimeout(()=>ring1padding.value = withSpring(ring1padding.value+hp(5)),100)
        setTimeout(()=>ring2padding.value = withSpring(ring2padding.value+hp(5.5)),300)
        setTimeout(()=>navigation.navigate('Home'), 2500)
    },[])
    return (
        <View className=" flex-1 bg-amber-500 items-center justify-center">
            <StatusBar backgroundColor="#eb992f" />
            <Animated.View className="bg-white/20  rounded-full" style={{padding:ring1padding}}>
            <Animated.View className="bg-white/20 rounded-full " style={{padding:ring2padding}}>
                <Image source={require("../assets/images/food_background1.png")} style={{ height: hp(20), width: hp(20), }} />
            </Animated.View>
            </Animated.View>
            <View className=" space-y-2 " style={{marginTop:hp(3)}}>
            <Text className=" text-white font-semibold tracking-widest" style={{fontSize:hp(7)}}>Foody</Text>
            <Text className="text-white tracking-widest" style={{fontSize:hp(2)}}>Food is always right</Text>
            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({})