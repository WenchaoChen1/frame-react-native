import { LoginUrlData, LoginUserData } from '@/api/types';
import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, Text, Platform, Modal } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useQuery } from '@tanstack/react-query';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { get, post } from '@/api/api';
import * as AuthSession from 'expo-auth-session';
export default function DraftScreen() {
    const [code, setCode] = useState<string | null>(null); // 用于存储 code
    const defaultFacebookUrl =`https://www.facebook.com/v3.3/dialog/oauth?response_type=code&client_id=1330399468134867&redirect_uri=http://localhost:8081/learn&scope=email`

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
        iosClientId:"1330399468134867",
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
        if (response?.type === 'success') {
            const { code, state: responseState } = response.params;
                setCode(code); // 存储 code
        }
    }, [response]);

    useEffect(() => {
        if (responseAndroid?.type === 'success') {
            const { code, state: responseState } = responseAndroid.params;
            setCode(code);
        }
    }, [responseAndroid]);


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
