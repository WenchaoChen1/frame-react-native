import {ScrollView, StyleSheet, Text, View} from "react-native";
import FollowDetailHeader from "@/components/feed/DetailHeader";
import FollowDetailMediaPlatform from "@/components/feed/DetailMediaPlatform";
import WorkProgress from "@/components/feed/WorkProgress";
import workProgressList from "@/data/feed/WorkProgressList";
import AchievementAwards from "@/components/feed/AchievementAwards";
import achievementAwardsList from "@/data/feed/AchievementAwardsList";

export default function details(){

    const onBackPress = () => {
        console.log("Back----");
    }

    const onCancelFollowClicl = () => {
        console.log("onCancelFollowClicl----");
    }

    const onInstagramClick=()=>{
        console.log("onInstagramClick----");
    }

    const onFacebookClick=()=>{
        console.log("onFacebookClick----");
    }

    const onSoundcloudClick=()=>{
        console.log("onSoundcloudClick----");
    }

    const onYoutubeClick=()=>{
        console.log("onYoutubeClick----");
    }

    return(
        <ScrollView style={styles.container}>
            <View >
                <FollowDetailHeader name={"Will Herrington"} role={"Keyboardist · Composer"} onBack={onBackPress} onCancelFollowClick={onCancelFollowClicl}></FollowDetailHeader>
                <FollowDetailMediaPlatform onInstagramClick={onInstagramClick} onFacebookClick={onFacebookClick} onSoundcloudClick={onSoundcloudClick} onYoutubeClick={onYoutubeClick}></FollowDetailMediaPlatform>
                <Text style={styles.description}>
                    Will Herrington is a pianist and composer whose career spans across multiple genres and industries. Emerging from the vibrant streets of New Orleans, he has collaborated with some of the biggest names in music, including Ariana Grande, Nick Jonas, Drake Bell, Alice Smith, Lukas Graham, Sabrina Carpenter, and among countless others. With an eclectic blend of jazz, pop, R&B, and classical influences, Will's music is as diverse as it is captivating.
                </Text>
                <WorkProgress dataList={workProgressList}></WorkProgress>
                <AchievementAwards dataList={achievementAwardsList}></AchievementAwards>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#0E0E0E',
    },

    description:{
        paddingHorizontal:16,
        color: '#7F7779',
        fontSize:14,
        alignItems: 'center',
    }

})


