import {Image, StyleSheet, Text, View} from "react-native";

type AchievementAwardsItemProps = {
    description: string;
}
export default function AchievementAwardsItem({description}: AchievementAwardsItemProps) {
    return (
        <View style={styles.container}>
            <Image source={require("@//assets/images/onedot.png")} style={styles.image}/>

            <Text style={styles.descriptive}>
                {description}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding:5,
        flexDirection: 'row',
        flex:1,
        alignItems: 'center',
    },
    image: {
        width:5,
        height:5,
    },
    descriptive:{
        marginLeft:10,
        color: '#7F7779',
        fontSize:14,
        alignItems: 'center',
    }
})

