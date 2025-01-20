import { Animated, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';

export default function WebPageView(props: any) {
  const [progress, setProgress] = useState(0); // 加载进度（0 到 1）
  const progressAnim = useRef(new Animated.Value(0)).current; // 用于动画的进度值
  // 处理加载进度
  const handleLoadProgress = ({ nativeEvent }) => {
    const newProgress = nativeEvent.progress; // 获取当前加载进度
    setProgress(newProgress);

    // 更新动画值
    Animated.timing(progressAnim, {
      toValue: newProgress,
      duration: 100, // 动画持续时间
      useNativeDriver: false, // 必须为 false，因为不支持样式动画的 Native Driver
    }).start();
  };

  const { googleLoginUrl } = useLocalSearchParams();
  return(
    <View style={styles.container}>
      {/* 进度条 */}
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>

      {/* WebView */}
      <WebView
        source={{ uri: googleLoginUrl }}
        style={styles.webview}
        onLoadProgress={handleLoadProgress}
        onLoadEnd={() => setProgress(1)} // 加载完成后将进度设置为 100%
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF', // 进度条颜色
  },
  webview: {
    flex: 1,
  },
})