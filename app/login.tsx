import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { useQuery } from '@tanstack/react-query';
import { LoginUserData } from '@/api/types';
import { get, post } from '@/api/api';
type Props = {
  data: string;
};
const LoginPage = ({}:Props) => {
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const redirectUriWeb = "http://localhost:8081/"
  const isAndroid = Platform.OS === 'android'; 
  const redirectUriAndroid = makeRedirectUri({
    native: "com.fy.tdraft:/",
    // @ts-ignore
    useProxy: true,
  })

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '306687462640-ffl2m3nbom4qt2q3p25q7oal79f51jee.apps.googleusercontent.com',
    iosClientId: '306687462640-ttdagd2ehm3h6asuc185s9til6kaag89.apps.googleusercontent.com',
    webClientId: '158104564519-voc1vdk1mo9ujag8qu2iu4o6o1mmviad.apps.googleusercontent.com',
    redirectUri: isAndroid ? redirectUriAndroid : redirectUriWeb,
    responseType: 'code',
    clientSecret:"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",
    scopes: ['openid', 'profile', 'email'],
  });

  const [userInfo, setUserInfo] = useState(null);

  const roleList =[{
    id:'listener',
    title:"Listener",
    desc:"Find Your Music",
    url:`@/assets/images/listener.png`
  },{
    id:'artist',
    title:"Artist",
    desc:"Share Your Drafts",
    url:`@/assets/images/artist.png`
  },]

  const getGoogleUserInfo = async (accessToken: string) => {
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

  const loginByGoogle = async () => {
    console.log('loginByGoogle');
    try {
      const result = await promptAsync();
      if (result?.type === 'success') {
        const { code } = result.params;
        setCode(code);
        console.log("code:",code);
        const { authentication } = result;
        await getGoogleUserInfo((authentication as any).accessToken);
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  }

  const {
    data: loginUserData,
    error: loginUserError,
  } = useQuery<LoginUserData>({
    queryKey: ['loginUser', code],
    queryFn: () =>
      post<LoginUserData>(
        '/musician/google/logintest',
        { credential: code ,
          role:selectedRole
        },
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

  console.log("loginUserData:",loginUserData,loginUserError);
  
  // Initialize WebBrowser session
  WebBrowser.maybeCompleteAuthSession();
  if (Platform.OS === 'web') {
    WebBrowser.maybeCompleteAuthSession({
      skipRedirectCheck: true
    });
  }

  return <View style={styles.container}>
    <LinearGradient
      colors={["#332042","#130d17","#1e1e1e"]}
      style={styles.background}
    />
    <Image
      source={
      require('@/assets/images/login/logo.png')
      }
      style={styles.imageLogo}
    />
    <Text style={styles.logoTitle}>Unleashing Musical Creativity</Text>
    <Text style={styles.logoTitleTips}>Join the platform created for sharing & discovering unfinished musical gems</Text>
    <Image
      source={
        require('@/assets/images/login/line.png')
      }
      style={styles.linePng}
    />
    <Text style={styles.selectTitle}>Select Your Preferred Role</Text>
    <View style={styles.roleContainer}>
      {roleList.map((role) => (
        <View key={role.id} style={styles.roleCard}>
          <View style={styles.radioContainer}>
            <TouchableOpacity 
              onPress={() => {setSelectedRole(role.id)
                console.log(role.id);
              }}
            >
              <View style={[
                styles.radio,
                selectedRole === role.id && styles.radioSelected
              ]}>
                {selectedRole === role.id && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          </View>
          <Image 
            source={role.id === "listener"
              ? require('@/assets/images/login/listener.png')
              : require('@/assets/images/login/artist.png')}
            style={styles.roleImage}
          />
          <Text style={styles.roleTitle}>{role.title}</Text>
          <Text style={styles.roleDesc}>{role.desc}</Text>
        </View>
      ))}
    </View>
    <TouchableOpacity 
      style={[styles.button, {marginBottom: Platform.OS === 'ios' ? 50 : 30}]}
      onPress={() => {
        if(selectedRole){
          loginByGoogle();
        }else{
          if (Platform.OS === 'web') {
            alert('Please select a role');
          } else {
            Alert.alert('Please select a role'); 
          }
        }
      }}
    >
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  </View>;
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding:20,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  background: {
    position: 'absolute',
    left: 0,
    bottom:0,
    top:0,
    right:0
  },
  imageLogo:{
    width: 150,
    height:150,
    resizeMode: 'contain',
    left:'auto',
    right:'auto',
  },
  logoTitle:{
    fontSize:24,
    fontWeight: 'condensedBold',
    color:"#f5f5f5",
    lineHeight:40,
    textAlign:'center',
  },
  logoTitleTips:{
    fontSize:14,
    color:"#f5f5f5",
    opacity:0.5,
    lineHeight:24,
    margin:10,
    textAlign:'center'
  },selectTitle:{
    fontSize:20,
    fontWeight:"condensedBold",
    textAlign:'center',
    color:'#f5f5f5',
  },linePng:{
    width:80,
    height:8,
    justifyContent:'center',
    alignItems:'center',
    margin:10,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 20,
    width:'100%',
  },
  roleCard: {
    flex:1,
    padding: 15,
    alignItems: 'center',
    margin: 10,
    position:'relative',
    backgroundColor:'#191819',
    borderRadius:10,
    borderWidth:1,
    borderColor:'#191819',
    width:"auto",
    height:'auto',
    minHeight:200,

  },
  radioContainer: {
    marginBottom: 20,
    textAlign:'right',
    position:"absolute",
    top:10,
    right:10,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#956eb7',
    backgroundColor: '#956eb7',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
  },
  roleImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    margin:20,
  },
  roleTitle: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  roleDesc: {
    color: '#f5f5f5',
    fontSize: 14,
    opacity: 0.7,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#956eb7',
    padding: 15,
    margin:20,
    width:'100%',
    height:48,
    borderRadius:24,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonText: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: 'semibold',
    textAlign: 'center',
  },

});


