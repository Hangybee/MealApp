import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../screen/Loading';
import CachedImage from '../helpers/image';
import { useNavigation } from '@react-navigation/native'
import Animated from 'react-native-reanimated';

const Recipes = ({ category, meals }) => {
    const navigation = useNavigation()

    const RecipeCard = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={()=>navigation.navigate('RecipieDetails',{...item})} className="flex-1  m-2 p-2">
                <Animated.Image sharedTransitionTag="tag" source={{ uri: item.strMealThumb }} style={{ borderRadius: 20, width: '100%', height: index % 3 == 0 ? hp(20) : hp(35) }} />
                {/* <CachedImage
                    uri={item.strMealThumb}
                    style={{ borderRadius: 20, width: '100%', height: index % 3 == 0 ? hp(20) : hp(35) }}
                    className="bg-black/5"
                /> */}
                <Text className=" font-bold text-neutral-600 mt-2">{item?.strMeal?.length > 20 ? item.strMeal.slice(0, 20) + "..." : item.strMeal}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View >
            <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600 ml-3">Recipes</Text>
            <View className="flex-1 justify-center items-center">
                {
                    category && category.length > 0 && meals.length > 0 ? (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => <RecipeCard item={item} index={index} />}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    ) : (
                        <Loading size={"large"} style={{ marginTop: 100 }} />
                    )
                }
            </View>
        </View>
    )
}

export default Recipes

const styles = StyleSheet.create({})