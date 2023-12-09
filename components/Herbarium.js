import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View, Button } from "react-native";
import { db } from "../CreateDatabase";
import { useEffect, useState } from "react";
import { Chip } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

export default function Herbarium({ navigation }) {
  const [plants, setPlants] = useState([]);

  const updatePlants = () => {
    console.log("UPDATING", db);
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT *, (SELECT COUNT(*) FROM herbarium WHERE plant_id = plants.id) as herbariumCount FROM plants;",
          [],
          (_, { rows }) => {
            console.log("RESULT", rows);
            setPlants(rows._array);
          }
        );
      },
      null,
      null
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      updatePlants();
    }, [])
  );

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Text style={styles.text}>
          Valitse listauksesta vähintään kymmenen kasvia jotka keräät.
        </Text>

        <FlatList
        style={{marginBottom: 20}}
          data={plants}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Plant", { plant: item })}
            >
              <View style={styles.itemChip}>
                <Item title={item.name} />
                {item.herbariumCount > 0 && (
                  <Chip
                    icon={{
                      name: "check",
                      type: "font-awesome",
                      size: 10,
                      color: "#F7E6C4",
                    }}
                    containerStyle={{ marginLeft: 10 }}
                    color="#606C5D"
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={{ height: 2, backgroundColor: "#FFF4F4" }} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 100
  },
  item: {},
  title: {
    textTransform: "capitalize",
    fontSize: 20,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    padding: 15,
  },
  itemChip: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
  },
});
