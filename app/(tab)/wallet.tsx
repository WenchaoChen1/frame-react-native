import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession(); // 确保 WebBrowser 正确关闭

export default function WalletScreen() {
    const redirectUriAndroid =  makeRedirectUri({
        native: "com.fy.tdraft:/oauthredirect",
        useProxy: true,
    })
    const redirectUriWeb = "http://localhost:8081/"
    const isAndroid = Platform.OS === 'android';
    console.log("isAndroid ?",isAndroid);
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId:
          '306687462640-ffl2m3nbom4qt2q3p25q7oal79f51jee.apps.googleusercontent.com',
        iosClientId:
          '306687462640-ttdagd2ehm3h6asuc185s9til6kaag89.apps.googleusercontent.com',
        webClientId:
          '306687462640-u3bhdth2p9gqboq44auhacme79rlhekc.apps.googleusercontent.com',
     //   redirectUri: 'http://localhost:8081/',
        redirectUri: isAndroid ? redirectUriAndroid :redirectUriWeb,
        responseType: 'code', // 请求授权码
        scopes: ['openid', 'profile', 'email'], // 请求所需的作用域
    });

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

    return (
      <View style={styles.container}>
          <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={openGoogleLogin}>
                  <Text style={styles.buttonLabel}>Google Login</Text>
              </Pressable>
          </View>

          {userInfo ?
            (<View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Name: {userInfo.name}</Text>
                <Text style={styles.infoTitle}>Email: {userInfo.email}</Text>
                <Text style={styles.infoTitle}>ID: {userInfo.id}</Text>
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