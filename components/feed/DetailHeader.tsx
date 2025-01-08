import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';

type Props = {
  onBack: () => void;
  onCancelFollowClick: () => void;
  name: string;
  role: string;
};

export default function FollowDetailHeader({
  onBack,
  onCancelFollowClick,
  name,
  role,
}: Props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/background-image.png')}
        style={styles.headerImage}
      >
        {/* 返回按钮 */}
        <Pressable style={styles.backcontainer} onPress={onBack}>
          <Image
            source={require('@/assets/images/back.png')}
            style={styles.back}
          />
        </Pressable>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleName}>{name}</Text>
          <Text style={styles.latestDraft}>{role}</Text>
        </View>

        <TouchableOpacity
          style={styles.followButton}
          onPress={onCancelFollowClick}
        >
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerImage: {
    width: '100%',
    height: 230,
    resizeMode: 'cover', // 确保图片按比例填充
  },
  backcontainer: {
    width: 48,
    height: 48,
    padding: 3,
  },
  back: {
    width: 48,
    height: 48,
    position: 'absolute', // 绝对定位
    top: 16, // 距离顶部 16
    left: 16, // 距离左侧 16
  },
  contentContainer: {
    padding: 16,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
  titleName: {
    fontSize: 20,
    marginBottom: 4,
    color: 'white',
    fontWeight: 'bold',
  },
  latestDraft: {
    fontSize: 14,
    color: '#7F7779',
  },
  followButton: {
    backgroundColor: '#1A1A1A', // 默认背景颜色
    paddingVertical: 13,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowRadius: 25,
    alignItems: 'center',
  },
  followText: {
    color: '#fff',
    fontSize: 14,
  },
});
