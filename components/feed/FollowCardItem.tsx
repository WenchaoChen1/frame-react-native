import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import {ImageSource} from "expo-image";

type FollowCardItemProps = {
    //avatar : ImageSource;
    id:string
    titleName:string;
    latestDraft:string
    plays:number
    coins:number
    onCancelClick : () => void
    onItemClick:(id:string)=>void
}

// 单个卡片组件
export default function  FollowCardItem({id,titleName,latestDraft,plays,coins,onCancelClick,onItemClick }: FollowCardItemProps) {

    return (
        <TouchableOpacity onPress={()=>{
            onItemClick(id)
        }}>
            <View style={styles.card} >
                {/* 左边：头像 */}
                <Image
                    source={require("@/assets/images/follow-default-avatar.png")} // 头像 URL
                    style={styles.avatar}
                />

                {/* 中间：标题和描述 */}
                <View style={styles.textContainer}>
                    <Text style={styles.titleName}>{titleName}</Text>
                    <Text style={styles.latestDraft}>{latestDraft}</Text>
                    <View style={styles.iconContainer}>
                        <View style={styles.playIcon}>
                            <Image
                                style={styles.play}
                                source={require("@/assets/images/play.png")}/>
                            <Text style={styles.latestDraft}>{plays} plays</Text>
                        </View>

                        <View style={styles.icon}>
                            <Image
                                style={styles.play}
                                source={require("@/assets/images/coins.png")}/>
                            <Text style={styles.latestDraft}>{coins} Tune Coins</Text>
                        </View>
                    </View>

                </View>

                {/* 右边：取消 */}
                <TouchableOpacity style={styles.cancelButton} onPress={onCancelClick}>
                    <Image
                        style={styles.cancelImage}
                        source={require("@/assets/images/right-more.png")}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 8,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 25,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    titleName: {
        fontSize: 16,
        marginBottom: 4,
        color: 'white',
    },
    latestDraft: {
        fontSize: 10,
        color: '#7F7779',
    },
    cancelButton: {
        padding: 8,
    },
    cancelImage:{
      width: 18,
      height: 18,
    },

    play:{
        width: 13,
        height: 13,
        marginRight:7
    },
    iconContainer:{
        marginTop:6,
        flexDirection: 'row',
        flex:1,
        justifyContent: 'center',
    },

    playIcon:{
        flex: 1/2,
        flexDirection: 'row',
    },

    icon:{
        flex: 1,
        flexDirection: 'row',
    }
});