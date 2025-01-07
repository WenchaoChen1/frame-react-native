import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import HeaderFeedFollow from "@/components/feed/HeaderFeedFollow";
import FollowCard from "@/components/feed/FollowCard";
import followListData from "@/data/feed/FollowListData";
import FollowCardItem from "@/components/feed/FollowCardItem";
import {router} from "expo-router";

export default function FeedScreen() {

    const [ShowDiscoverPage,setShowDiscoverPage] = useState(true);

    const handleDiscoverPress = () => {
        setShowDiscoverPage(true);
        console.log("Discover button pressed!");
    };

    const handleFollowingPress = () => {
        setShowDiscoverPage(false);
        console.log("Following button pressed!");
    };

    const handleOnMoreClick=()=>{
        console.log("Following OnMoreClick---");
    }

    const handleOnCancelClick=()=>{
        console.log("OnCancelClick---");
    }

    const handleFollowItemClick=(id:string)=>{
       // router.push("/follow-detail")
        router.push({pathname:"/follow-detail",params:{id}})
    }
    // 渲染单个卡片
    const followItem = () => (
        <FollowCardItem id={"27302407"} titleName={"234"} latestDraft={"34324"} plays={23} coins={90} onCancelClick={handleOnCancelClick} onItemClick={handleFollowItemClick}/>
    )

    return (
        <View style={styles.container}>
            <HeaderFeedFollow  onDiscoverPress={handleDiscoverPress} onFollowingPress={handleFollowingPress}/>

            {ShowDiscoverPage ?
                (<View>
                    <Text>Discover Page</Text>
                </View>):
                 (<View style={styles.followContainer}>
                     <FollowCard onMoreClick={handleOnMoreClick}></FollowCard>

                     <FlatList
                         data={followListData}
                         renderItem={followItem}
                         keyExtractor={(item) => item.id}
                         contentContainerStyle={styles.listContainer}
                     />
                 </View>)}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#1b1b1b",
        paddingHorizontal:16,
        paddingTop:62
    },

    followContainer:{
        flex: 1,    // 和权重类似， 占满剩余全部的空间或者 按比例平分空间。
    },

    listContainer:{
        marginTop:10,
    }
})
