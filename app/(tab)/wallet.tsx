import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { MusicianDetailData } from '@/api/types';
import { get } from '@/api/api';

WebBrowser.maybeCompleteAuthSession(); // 确保 WebBrowser 正确关闭

export default function WalletScreen() {
    // @ts-ignore
    const redirectUriAndroid =  makeRedirectUri({
        native: "com.fy.tdraft:/draft",   //  /指定Google登录返回路由
        // @ts-ignore
        useProxy: true,
    })
    const redirectUriWeb = "http://localhost:8081/"
    const isAndroid = Platform.OS === 'android';
    console.log("isAndroid ?",isAndroid);
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId:
        process.env.androidClientId,
        iosClientId:
        process.env.iosClientId,
        webClientId:
        process.env.webClientId,
     //   redirectUri: 'http://localhost:8081/',
        redirectUri: isAndroid ? redirectUriAndroid :redirectUriWeb,
        responseType: 'code', // 请求授权码
        scopes: ['openid', 'profile', 'email'], // 请求所需的作用域
    });
    // 添加查询获取登录URL的逻辑
    const {
        data: googleAuthUrl,
        isLoading: isUrlLoading,
    } = useQuery({
        queryKey: ['googleLoginUrl'],
        queryFn: () => 
            get('/musician/googleLoginUrl').then(res => res.data),
        enabled: Platform.OS === 'web' // 仅在web端启用此查询
    });

    // 修改web端登录处理函数

    const handleWebLogin = async () => {
        if (!googleAuthUrl) return;
        
        // 使用AuthSession.startAsync处理web端OAuth流程
        const result = await WebBrowser.openAuthSessionAsync(
          typeof googleAuthUrl === 'string' ? googleAuthUrl :"",
            redirectUriWeb,
            {
                showInRecents: true,
                preferEphemeralSession: true
            }
        );
        
        if (result.type === 'success') {
            const url = result.url;
            // 从URL中提取code参数
            const code = new URL(url).searchParams.get('code');
            if (code) {
                console.log('获取到授权码:', code);
            }
        }
    };

    // 修改urlLogin函数
    const urlLogin = () => {
        if (Platform.OS === 'web') {
            handleWebLogin(); // 使用新的web端处理函数
        } else {
            router.push({ 
                pathname: '/web-detail',
                params: { googleLoginUrl }
            });
        }
    };

    useEffect(() => {
        if (response?.type === 'success') {

            const { code } = response.params; // 从回调参数中获取授权码
            console.log('授权码:', code);

            const { authentication } = response;
            getGoogleUser((authentication as any).accessToken);

        }
    }, [response]);

    const getGoogleUser = async (accessToken: string) => {
        console.log('accessToken :', accessToken);
        try {
            const response = await fetch(
              'https://www.googleapis.com/userinfo/v2/me',
              {
                  headers: { Authorization: `Bearer ${accessToken}` },
              }
            );
            const user = await response.json();
            setUserInfo(user);
            console.log('user : ', user);
            console.log('user : ', user.email);
        } catch (error) {
            console.log('GoogleUserReq error: ', error);
        }
    };


    const openGoogleLogin = ()=>{
        console.log("isAndroid ?",isAndroid);
        promptAsync();
    }

    // requestUrl:http://192.168.0.111:8103/musician/googleLoginUrl
    const googleLoginUrl = "https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&response_type=code&redirect_uri=https://www.baidu.com&client_id=158104564519-voc1vdk1mo9ujag8qu2iu4o6o1mmviad.apps.googleusercontent.com";
 

    const handleOpenWebPage = async () => {
        await WebBrowser.openBrowserAsync(googleLoginUrl);
    };



    return (
      <View style={styles.container}>
          <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={openGoogleLogin}>
                  <Text style={styles.buttonLabel}>Google Login</Text>
              </Pressable>
          </View>

          <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={urlLogin}>
                  <Text style={styles.buttonLabel}>URL Login</Text>
              </Pressable>
          </View>


          {userInfo ?
            (<View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Name: {userInfo?.name}</Text>
                <Text style={styles.infoTitle}>Email: {userInfo?.email}</Text>
                <Text style={styles.infoTitle}>ID: {userInfo?.id}</Text>
            </View>) : (<View></View>)
          }
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1b1b1b',
    },

    title: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#38434D',
    },
    buttonContainer: {
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: '#38434D',
        width: 320,
        height: 68,
        marginHorizontal: 20, // 左右外边距的样式 等同于marginLeft marginRight
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', // 子元素水平排列（从左到右）
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
    infoContainer:{
     padding:20,
    },
    infoTitle:{
        marginBottom:6,
        fontSize: 16,
        color: '#fff',
    }
});