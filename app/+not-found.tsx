import {Link, Stack} from "expo-router";
import {StyleSheet, View} from "react-native";

export default function NotFoundScreen(){
    return(
        <>
            <Stack.Screen options={{ title: 'Oops! Not Fount' }} />
            <View style={styles.container}>
                <Link href="/" style={styles.button}>
                    GO back to Home Screen!
                </Link>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button:{
      fontSize:24,
      color:"white",
       textDecorationLine:"underline",
    }
})
