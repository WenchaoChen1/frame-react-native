import {FlatList, StyleSheet, Text, View} from "react-native";
import React from "react";
import WorkProgressItem from "@/components/feed/WorkProgressItem";
import workProgressList from "@/data/feed/WorkProgressList";
import AchievementAwardsItem from "@/components/feed/AchievementAwardsItem";

type WorkProgressProps = {
    dataList:ArrayLike<any>;
}

export default function WorkProgress({dataList}: WorkProgressProps  )  {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Work in Progress </Text>

            <FlatList
                data={dataList}
                renderItem={({ item }) => (
                    <WorkProgressItem titleName={item.title} plays={item.play} coins={item.coins} onCancelClick={()=>{}} onItemClick={()=>{}}/>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical:20,
        paddingHorizontal:16
    },
    title:{
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
    },
})