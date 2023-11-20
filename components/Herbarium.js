import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View, Button } from "react-native";
import { db } from "../CreateDatabase";
import { useEffect, useState } from "react";

export default function Herbarium({ navigation }) {
  const [plants, setPlants] = useState([]);

  const updatePlants = () => {
    console.log("UPDATING", db);
    db.transaction(
      (tx) => {
        tx.executeSql("select * from plants;", [], (_, { rows }) => {
          console.log("RESULT", rows);
          setPlants(rows._array);
        });
      },
      null,
      null
    );
  };

  useEffect(() => {
    updatePlants();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>{plants.length}</Text>
        {plants.map((plant, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate("Plant", {plant: plant})}
          >
            <Text>{plant.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F1C376",
    padding: 10,
    marginTop: 15,
  },
});
