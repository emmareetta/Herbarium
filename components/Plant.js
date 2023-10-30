import { StatusBar } from "expo-status-bar";
import { Text, View, Button, StyleSheet } from "react-native";
import { Chip } from '@rneui/themed';
import * as Linking from 'expo-linking';


export default function Plant() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Hieskoivu
            </Text>
            <Chip
               icon={{
                name: 'info',
                type: 'font-awesome',
                size: 15,
                color: '#F7E6C4',
               }}
               containerStyle={{ marginVertical: 2, marginRight: 100 }}
               onPress={() => Linking.openURL('https://luontoportti.com/t/889/hieskoivu')}
               color='#606C5D'
               
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
        fontStyle: 'bold',
        justifyContent: 'center',
        fontSize: 25
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF4F4',
        flexDirection: 'row',
       // alignItems: 'center',
        paddingLeft: 100,
        paddingTop: 20
    }
})