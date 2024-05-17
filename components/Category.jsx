import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { categoryData } from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';

const Category = ({ visible, handleCategoryChange , data }) => {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-5 gap-x-4 "
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data && data?.map((currEle, index) => {
                        return (
                            <TouchableOpacity onPress={() => handleCategoryChange(currEle.strCategory)} key={index} className="flex space-y-1 items-center">
                                <View className="p-1" style={visible === currEle.strCategory ? ({ backgroundColor: 'yellow', borderRadius: 100 }) : null}>
                                    <Image source={{ uri: currEle.strCategoryThumb }} style={{ height: hp(7), width: hp(7), borderRadius: 60 }} alt='food_pic' />
                                </View>
                                <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>{currEle.strCategory}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </Animated.View>
    )
}

export default Category
