import { StatusBar } from "expo-status-bar";
import { SafeAreaView, SectionList, StyleSheet } from "react-native";
import { Text, View, Button } from "react-native";

export default function Herbarium() {
    const DATA = [
        {
            title: 'Puut ja pensaat',
            data: ['mänty', 'kuusi', 'hieskoivu', 'rauduskoivu', 'pihlaja', 'leppä',
                    'kataja', 'haapa', 'paju', 'tuomi']
        },
        {
            title: 'Varvut',
            data: ['mustikka', 'puolukka', 'juolukka', 'kanerva', 'variksenmarja' ]
        },
        {
            title: 'Ruohovartiset',
            data: ['metsätähti', 'metsälauha', 'oravanmarja']
        },
        {
            title: 'Sanikkaiset',
            data: ['riidenlieko', 'kallioimarre', 'metsänalvejuuri']
        },
        
    ]
    return(
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item}</Text>
                    </View>
                )}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.header}>{title}</Text>
                )}
                />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
        backgroundColor: '#F7E6C4',
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 18,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 14,
    },
  });
  