import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: '#555843', paddingBottom: 15}}>KASVIO, your mobile way to make herbarium!</Text>
      <Text style={{fontWeight: 'bold'}}>What is herbarium?</Text>
      <Text style={{maxWidth: 250, fontSize: 14}}>Herbarium is way to collect flora and learn from nature. Traditionally herbarium is dome by pressing and drying plants 
        and preserving them in a folder. </Text>
     <View
     style={{padding: 20}}>
        <Button 
          title='Register'
          onPress={null}
          color= '#555843'
        />
      </View>

      <View
      style={{padding: 20}}>
        <Button
          title='Start new herbarium'
          onPress={null}
          color= '#F1C376'
        />
      </View>

      <View>
        <Button
          title='List of Plants'
          color= '#F1C376'
          onPress={null}
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
