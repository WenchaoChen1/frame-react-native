// 用于定义选项卡布局，与跟布局是分开的。
// export default interface TabLayout (){
//     retrun(
//
//     )
// }

import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {Image} from "react-native";


export default function TabLayout() {
    return (
        // 使用 prop 来改变标签栏和标题的背景颜色
        <Tabs screenOptions={{
            tabBarActiveTintColor:"#ffd33d", // 更改底部tab标签颜色
            headerStyle:{
                backgroundColor:'#25292e'    // 将标题的背景设置为25292e
            },
            headerShadowVisible :false, // 禁用了标题的阴影
            headerTintColor:"#fff",//适用于标题标签。
            tabBarStyle:{
                backgroundColor:'#25292e',   // 将底部tab标签栏背景设置为25292e
            },
            tabBarIconStyle:{
                flexDirection:'column',
                alignItems:'center',
            },
            tabBarLabelStyle:{
             //  marginTop:4
            }

        }}>
            <Tabs.Screen 
                name="index" 
                options={{title:"Home",tabBarIcon:({color,focused})=>(
                    <Image
                        source={focused ? require('@/assets/images/home-outline.png') : require('@/assets/images/home.png')}
                        style={{width:24,height:24,tintColor:color}}
                    />

                )}} />

            <Tabs.Screen
                name="feed"
                options={{title:"Feed",tabBarIcon:({color,focused})=>(
                        <Image
                            source={focused ? require('@/assets/images/feed-ontline.png') : require('@/assets/images/feed.png')}
                            style={{width:24,height:24,tintColor:color}}
                        />
                    )}} />

            <Tabs.Screen
                name="favourite"
                options={{title:"Favourite",tabBarIcon:({color,focused})=>(
                        <Image
                            source={focused ? require('@/assets/images/favourite-outline.png') : require('@/assets/images/favourite.png')}
                            style={{width:24,height:24,tintColor:color}}
                        />
                    )}} />

            <Tabs.Screen
                name="draft"
                options={{title:"My Draft",tabBarIcon:({color,focused})=>(
                        <Image
                            source={focused ? require('@/assets/images/musical-outline.png') : require('@/assets/images/musical.png')}
                            style={{width:24,height:24,tintColor:color}}
                        />
                    )}} />

            <Tabs.Screen
                name="wallet"
                options={{title:"Wallet",tabBarIcon:({color,focused})=>(
                        <Image
                            source={focused ? require('@/assets/images/wallet-outline.png') : require('@/assets/images/wallet.png')}
                            style={{width:24,height:24,tintColor:color}}
                        />
                    )}} />

        </Tabs>
    )
}