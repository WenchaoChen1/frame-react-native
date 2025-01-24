import { LoginUrlData, LoginUserData } from '@/api/types';
import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, Text, Platform, Modal } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useQuery } from '@tanstack/react-query';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { get, post } from '@/api/api';
import * as AuthSession from 'expo-auth-session';
import { WebView } from 'react-native-webview';
export default function DraftScreen() {
    const [userInfo, setUserInfo] = useState<object | null>(null);
    const [code, setCode] = useState<string | null>(null); // 用于存储 code
    const [isAndroid, setIsAndroid] = useState(Platform.OS==='android');
    const [modalVisible, setModalVisible] = useState(false);
    const defaultFacebookUrl =`https://www.facebook.com/v3.3/dialog/oauth?response_type=code&client_id=1330399468134867&redirect_uri=http://localhost:8081/learn&scope=email`
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    WebBrowser.maybeCompleteAuthSession();


    const generateState = () => {
        return   Math.random().toString(36).substring(2, 15);
    };
    const [state, setState] = useState<string>(generateState());


    const {
        data: facebookAuthUri,
        isLoading: isURlLoading,
        error: musicianError,
    } = useQuery<LoginUrlData>({
        queryKey: ['loginUrlGet'],
        queryFn: () =>
          get<LoginUrlData>('/musician/facebookLoginUrl').then(
            res => res.data
          ),
    });

    // 返回用户信息
    const {
      data: loginUserData,
      error: loginUserError,
    } = useQuery<LoginUserData>({
      queryKey: ['loginUser', code],
      queryFn: () =>
        post<LoginUserData>(
          '/musician/facebook/loginTest',
          { credential: code },
          {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
          }
        )
          .then(res => res.data)
          .catch(error => {
            console.error(
              'Request Error:',
              error.response?.data || error.message
            );
            throw error;
          }),
      enabled: !!code,
    });

    const webRedirectUri = AuthSession.makeRedirectUri({
        // @ts-ignore
        useProxy: false,
        native: 'http://localhost:8081',
        path: '/draft',
    });
 /*  const androidRedirectUri = AuthSession.makeRedirectUri({
        // @ts-ignore
        useProxy: false,
        native: 'com.fy.tdraft',
        scheme: 'com.fy.tdraft', // 显式指定 scheme
        path: '/draft',
    });*/

    const webFacebookLogin = async () => {
      if (request) {
        await promptAsync();
      }
    }
    const appFacebookLogin = async () => {
        if (requestAndroid) {
            await promptAsyncAndroid();
        }
    };

    const [request, response, promptAsync] = Facebook.useAuthRequest({
       webClientId: "1330399468134867",
        clientSecret:"74d779ce624603867f125847b86c1d20",
        codeChallenge: "",
        codeChallengeMethod: undefined,
        prompt: undefined,
        scopes: ['public_profile','email'],
        state: state,
        usePKCE: false,
        responseType: 'code',
        redirectUri: webRedirectUri, // OAuth 认证成功后回调的 URI
    });

    const [requestAndroid, responseAndroid, promptAsyncAndroid] = Facebook.useAuthRequest({
        clientId: "1330399468134867",
        androidClientId:"1330399468134867",
        iosClientId:"1330399468134867r",
        clientSecret:"74d779ce624603867f125847b86c1d20",
        codeChallenge: "",
        codeChallengeMethod: undefined,
        prompt: undefined,
        scopes: ['public_profile','email'],
        state: state,
        usePKCE: false,
        responseType: 'code',
        redirectUri:  `https://auth.expo.io/@coke_hui/TuneDraft`
    });


    useEffect(() => {
        console.log(response,'reponse');
        if (response?.type === 'success') {
            const { code, state: responseState } = response.params;
                setCode(code); // 存储 code
        }
    }, [response]);

    useEffect(() => {
        console.log(responseAndroid,'reponse');
        if (responseAndroid?.type === 'success') {
            const { code, state: responseState } = responseAndroid.params;
                setCode(code); // 存储 code
             console.log('>>>>>>> Authorization code:', code,'>>>>>>>>>>',responseState,'<<<<<<<',state);
        }
    }, [responseAndroid]);

    const onMessage = (event: { nativeEvent: { data: any } }) => {
      const message = event.nativeEvent.data;
      const parsedData = JSON.parse(message); // 假设发送的是 JSON 格式

      if (parsedData.loggedIn) {
        // 登录成功，保存信息
        setUserInfo(parsedData.user);
        toggleModal(); // 关闭 WebView 弹框
      }
    };

    return (
      <View style={styles.container}>
     { Platform.OS==="web"?<Button title="Login with Facebook" onPress={webFacebookLogin} />: <Button title="Login with Facebook" onPress={appFacebookLogin} />}

        {code && (
          <>
            <Text>{code}</Text>
            <Text>{JSON.stringify(code)}</Text>
          </>
        )}
        {response && (
          <>
            <Text>{response.type}</Text>
            <Text>{JSON.stringify(response)}</Text>
          </>
        )}
        {loginUserData && (
          <>
            <Text style={styles.userInfo}>
              {`User Info: ${loginUserData.id}`}
            </Text>
            <Text style={styles.userInfo}>
              {`User Info: ${loginUserData.email}`}
            </Text>
          </>
        )}
        {loginUserError && <Text>{JSON.stringify(loginUserError)}</Text>}
       {/* {isAndroid && (
          <>
            <Button title="Login with Facebook" onPress={toggleModal} />
            {userInfo && <Text>{JSON.stringify(userInfo)}</Text>}
            <Modal
              visible={modalVisible}
              animationType="slide"
              onRequestClose={toggleModal}
              transparent={true}
            >
              <Button title="关闭" onPress={toggleModal} />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: '90%',
                    height: '80%',
                    backgroundColor: 'white',
                  }}
                >
                  <WebView
                    source={{
                      uri:
                        typeof facebookAuthUri === 'string'
                          ? facebookAuthUri
                          : defaultFacebookUrl,
                    }}
                    onMessage={onMessage}
                    javaScriptEnabled={true}
                    injectedJavaScript={`
                function loginSuccess(userData) {
                  window.ReactNativeWebView.postMessage(JSON.stringify({ loggedIn: true, user: userData }));
                }
                setTimeout(() => loginSuccess({ username: 'example', token: 'abc123' }), 3000);
              `}
                  />
                </View>
              </View>
            </Modal>
          </>
        )}*/}
      </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },

    title:{
        fontSize: 64,
        fontWeight: "bold",
        color: "#38434D",
    },
    userInfo: {
        marginTop: 20,
        textAlign: 'center',
    },


})
