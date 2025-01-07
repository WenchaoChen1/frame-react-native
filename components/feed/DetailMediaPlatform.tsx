import {Image, Pressable, StyleSheet, View} from "react-native";

type Props ={
    onInstagramClick: () => void,
    onFacebookClick: () => void,
    onSoundcloudClick: () => void,
    onYoutubeClick: () => void,

}

export default function FollowDetailMediaPlatform({onInstagramClick, onFacebookClick, onSoundcloudClick,onYoutubeClick}: Props   ) {
    return (
        <View style={styles.container}>
            <Pressable onPress={onInstagramClick}>
                <Image source={require('@//assets/images/instagram.png')}
                style={styles.imge}/>
            </Pressable>

            <Pressable onPress={onFacebookClick}>
                <Image source={require('@//assets/images/facebook.png')}
                       style={styles.imge}/>
            </Pressable>

            <Pressable  onPress={onSoundcloudClick}>
                <Image source={require('@//assets/images/soundcloud.png')}
                       style={styles.imge}/>
            </Pressable>

            <Pressable onPress={onYoutubeClick}>
                <Image source={require('@//assets/images/youtube.png')}
                       style={styles.imge}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
       paddingHorizontal:16,
        paddingTop:9,
        paddingBottom:16
    },

    imge:{
        width: 48,
        height: 48,
        marginRight:7
    }
})