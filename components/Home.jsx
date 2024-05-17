import { Image, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { TextInput } from 'react-native-gesture-handler';
import Category from './Category';
import Recipes from './Recipes';
const Home = () => {
    const [visibile, setVisible] = useState('starter')
    const [category, setCategory] = useState([])
    const [meals, setMeals] = useState([])
    const getCategories = async () => {
        try {
            const response = await fetch("https://themealdb.com/api/json/v1/1/categories.php")
            if (!response.ok) {
                console.log('error occured while hitting the api')
            }
            else {
                const data = await response.json()
                setCategory(data.categories)
            }
        }
        catch (error) {
            console.log('error occured', error)
        }
    }

    const getRecipie = async (category = "starter") => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            if (!response.ok) {
                console.log('error occured while hitting the api')
            }
            else {
                const data = await response.json()
                setMeals(data.meals)
            }
        }
        catch (error) {
            console.log('error occured', error)
        }
    }

    const handleCategoryChange = (category) =>{
       getRecipie(category)
       setVisible(category)
       setMeals([]) 
    }
    useEffect(() => {
        getCategories()
        getRecipie()
    }, [])

    return (
        <View className="flex-1 bg-white">
            <StatusBar backgroundColor={"white"} barStyle="dark-content" />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                className="space-y-6 pt-3"
            >
                <View className="flex-row justify-between items-center mx-4">
                    <Image source={require("../assets/images/profile_pic.png")} style={{ height: hp(5.5), width: hp(5), borderRadius: 25 }} />
                    <BellIcon size={hp(4)} color="gray" />
                </View>
                <View className="ml-2">
                    <Text className="text-neutral-500">Hello, Mayank!</Text>
                    <Text className="text-2xl font-bold text-neutral-600">Make your own food,</Text>
                    <Text className="text-2xl text-neutral-600 font-bold">Stay at <Text className="text-amber-400">home</Text></Text>
                </View>
                <View className="p-1 bg-gray-200 mx-3 rounded-full flex-row items-center justify-between">
                    <TextInput
                        placeholder='Search any recepie'
                        className="ml-3 flex-1 tracking-wider"
                    />
                    <View className="p-2 bg-white rounded-full">
                        <MagnifyingGlassIcon size={24} color="gray" />
                    </View>
                </View>
                {Category.length > 0 && <Category visible={visibile} handleCategoryChange={handleCategoryChange} data={category} />}

                <Recipes category={category} meals={meals} />
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})