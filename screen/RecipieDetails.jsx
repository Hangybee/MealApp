import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ClockIcon, FireIcon } from "react-native-heroicons/outline"
import { HeartIcon, UsersIcon, Square3Stack3DIcon } from "react-native-heroicons/solid"
import Loading from './Loading'

import { useNavigation } from '@react-navigation/native'
import YoutubeIframe from 'react-native-youtube-iframe'
import Animated from 'react-native-reanimated'
const RecipieDetails = ({ route }) => {

    const [detail, setDetail] = useState([])
    const navigation = useNavigation()
    const fetchDetails = async () => {
        try {
            const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${route.params.idMeal}`)
            if (!response.ok) {
                console.log('some error occured')
            }
            else {
                const data = await response.json()
                setDetail(data.meals[0])
            }
        }
        catch (error) {
            console.log('error occured', error)
        }
    }

    const ingredientsIndexes = (detail) => {
        if (!detail) return []
        const index = []
        for (let i = 0; i < 20; i++) {
            if (detail["strIngredient" + i]) {
                // console.log(detail["strIngredient"+i])
                index.push(i)
                // console.log('wwweeeee',i)
            }
        }
        return index
    }

    const getYouTubeVideoId = (url) =>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex)
        if(match && match[1]){
            return match[1]
        }
        return null
    }

    useEffect(() => {
        fetchDetails()
    }, [])

    return (
        <View>
            {
                !detail ? (<Loading size={"large"} className="mt-96" />) :
                    (
                        <ScrollView className="mb-2">
                            <Animated.Image sharedTransitionTag="tag" source={{ uri: detail?.strMealThumb }} style={{ height: 350, width: '100%', position: 'absolute' }} resizeMode='cover' />
                            <View className=" rounded-full mt-4 mx-3 flex-row justify-between">
                                <TouchableOpacity onPress={() => navigation.goBack()} className="p-1.5 bg-white rounded-full items-center justify-center">
                                    <ChevronLeftIcon size={28} strokeWidth={3} color="#fbbf24" />
                                </TouchableOpacity>
                                <TouchableOpacity className="p-1.5 bg-white rounded-full items-center justify-center">
                                    <HeartIcon size={28} strokeWidth={3} color="gray" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 310, marginLeft: 3 }}>
                                <Text className="text-2xl font-bold text-black">{detail?.strMeal}</Text>
                                <Text className=" font-bold text-lg">{detail?.strArea}</Text>
                                <View className="flex-row justify-between mt-5 mx-10">
                                    <View className="p-1.5 h-28 rounded-full bg-yellow-400 items-center">
                                        <View className="p-2 rounded-full bg-white mb-1.5">
                                            <ClockIcon size={28} strokeWidth={2.3} color="#525252" />
                                        </View>
                                        <Text className="font-bold text-gray-700">35</Text>
                                        <Text className="font-bold text-gray-700 text-xs">Mins</Text>
                                    </View>
                                    <View className="p-1.5 h-28 rounded-full bg-yellow-400 items-center ">
                                        <View className="p-2 rounded-full bg-white mb-1.5">
                                            <UsersIcon size={28} strokeWidth={2.3} color="#525252" />
                                        </View>
                                        <Text className="font-bold text-gray-700">03</Text>
                                        <Text className="font-bold text-gray-700 text-xs">Servings</Text>
                                    </View>
                                    <View className="p-1.5 h-28 rounded-full bg-yellow-400 items-center">
                                        <View className="p-2 rounded-full bg-white mb-1.5">
                                            <FireIcon size={28} strokeWidth={2.3} color="#525252" />
                                        </View>
                                        <Text className="font-bold text-gray-700">103</Text>
                                        <Text className="font-bold text-gray-700 text-xs">Cal</Text>
                                    </View>
                                    <View className="p-1.5 h-28 rounded-full bg-yellow-400 items-center ">
                                        <View className="p-2 rounded-full bg-white mb-5">
                                            <Square3Stack3DIcon size={28} strokeWidth={2.3} color="#525252" />
                                        </View>
                                        <Text className="font-bold text-gray-700">Easy</Text>
                                    </View>
                                </View>
                                {/* ingredients */}
                                <View className="mt-2">
                                    <Text className="text-neutral-700 text-lg font-bold mb-2">Ingredients</Text>
                                    {
                                        ingredientsIndexes(detail).map((i) => {
                                            return (
                                                <View className="flex-row items-center space-x-2 ml-2 space-y-1">
                                                    <View className="w-3 h-3 bg-yellow-500 rounded-full "></View>
                                                    <Text className="font-bold text-neutral-700">{detail["strMeasure" + i]}</Text>
                                                    <Text className="font-bold text-neutral-500">{detail["strIngredient" + i]}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                {/* instructions */}
                                <View className="mt-2">
                                    <Text className="text-neutral-700 text-lg font-bold mb-2">Instructions</Text>
                                     <Text className="text-neutral-700 text-sm">{detail && detail["strInstructions"]}</Text>
                                </View>
                                    {/* recipie video */}
                                    {
                                        detail && detail["strYoutube"] && (
                                            <View className="mt-3">
                                                <Text className="font-bold flex-1 my-2 text-lg text-neutral-600">Recipie Video</Text>
                                                <YoutubeIframe
                                                    videoId={getYouTubeVideoId(detail?.strYoutube)}
                                                    // videoId='ONX74yP6JnI'
                                                    height={240}
                                                    
                                                />
                                            </View>
                                        )
                                        
                                    }
                            </View>
                        </ScrollView>
                    )
            }
        </View>
    )
}

export default RecipieDetails

const styles = StyleSheet.create({})

{/* <Image source={{uri:detail?.strMealThumb} } style={{height:350, width:'100%', position:'absolute'}} resizeMode='cover'/>
<ChevronLeftIcon size={hp(4)} color="gray" /> */}