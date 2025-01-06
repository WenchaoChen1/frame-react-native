// 用于定义选项卡布局，与跟布局是分开的。
// export default interface TabLayout (){
//     retrun(
//
//     )
// }

import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";




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
            }
        }}>
            <Tabs.Screen 
                name="index" 
                options={{title:"Home",tabBarIcon:({color,focused})=>(
                    <Ionicons name={focused? "home-sharp" : "home-outline"} color={color} size={24}/>
                )}} />

            <Tabs.Screen
                name="feed"
                options={{title:"Feed",tabBarIcon:({color,focused})=>(
                        <Ionicons name={focused? "home-sharp" : "home-outline"} color={color} size={24}/>
                    )}} />

            <Tabs.Screen
                name="favourite"
                options={{title:"Favourite",tabBarIcon:({color,focused})=>(
                        <Ionicons name={focused? "home-sharp" : "home-outline"} color={color} size={24}/>
                    )}} />

            <Tabs.Screen
                name="draft"
                options={{title:"My Draft",tabBarIcon:({color,focused})=>(
                        <Ionicons name={focused? "home-sharp" : "home-outline"} color={color} size={24}/>
                    )}} />

            <Tabs.Screen
                name="wallet"
                options={{title:"Wallet",tabBarIcon:({color,focused})=>(
                        <Ionicons name={focused? "home-sharp" : "home-outline"} color={color} size={24}/>
                    )}} />

        </Tabs>
    )
}