import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: '#555843', paddingBottom: 15}}>KASVIO, se helppo tapa tehdä kasvio!</Text>
      <Text style={{fontWeight: 'bold'}}>Mikä on kasvio?</Text>
      <Text style={{maxWidth: 250, fontSize: 14}}>Kasvion avulla kerätään ja opitaan tietoa luonnosta. Perinteisesti kasvio on tehty prässäämällä ja kuivaamalla kasvit sekä tallentamalla ne kansioon.
      KASVIOn avulla voit kerätä kasvioon tietoa kasveista ilman, että sinun tarvitsee vahingoittaa kasvia. KASVIOon voit tallentaa kuvan ja lisätietoa kasvista sekä 
      esimerkiksi sen löytämisestä nousseita tunteita, myös kasvin kasvupaikkaa on hyvä kuvata sanallisesti. </Text>
     

      <View
      style={{padding: 20}}>
        <Button
          title='Aloita kasvion tekeminen'
          onPress={() => navigation.navigate('Herbarium')}
          color= '#F1C376'
        />
      </View>

    

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
