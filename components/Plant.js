import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { Chip } from "@rneui/themed";
import * as Linking from "expo-linking";
import * as ImagePicker from "expo-image-picker";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { db } from "../CreateDatabase";
import * as FileSystem from "expo-file-system";

export default function Plant({ route, navigation }) {
  const { plant } = route.params;
  const [image, setImage] = useState(null);
  const [event, setEvent] = useState(undefined);
  const [gpsLocation, setGpsLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [information, onChangeText] = React.useState("");

  const mapRef = React.createRef();

  const setGpsLocationWithGpsPosition = (position) => {
    setGpsLocation({
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      latitude: parseFloat(position.coords.latitude),
      longitude: parseFloat(position.coords.longitude),
    });
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

     
    })();

    updateGpsPosition();

    loadPlant();
  }, []);

  const updateGpsPosition = () => {
    Location.getLastKnownPositionAsync().then((newLocation) => {
      console.log("LAST", newLocation);
      setGpsLocationWithGpsPosition(newLocation);

      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5,
      }).then((newLocation) => {
        console.log("NEW", newLocation);
        setGpsLocationWithGpsPosition(newLocation);
      });
    });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    const permmissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permmissionResult.granted === false) {
      alert("Et antanut sovellukselle lupaa käyttää kameraa!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const loadPlant = () => {
    console.log("LOADING", db);
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM herbarium WHERE plant_id = ?;",
          [plant.id],
          (_, { rows }) => {
            console.log("PLANT", rows);
            const selectedEvent =
              rows._array.length > 0 ? rows._array[0] : undefined;
            setEvent(selectedEvent);
            if (selectedEvent) {
              setLocation({
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                latitude: parseFloat(selectedEvent.latitude),
                longitude: parseFloat(selectedEvent.longitude),
              });
            }
          }
        );
      },
      null,
      null
    );
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (gpsLocation) {
    text = JSON.stringify(gpsLocation);
  }


  const saveData = () => {
    console.log("SAVING");

    const imageLocation =
      FileSystem.documentDirectory + "plant_" + plant.id + "_image";
    FileSystem.copyAsync({ from: image, to: imageLocation });

    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into herbarium (name, plant_id, latitude, longitude, image, information) values (?, ?, ?, ?, ?, ?);",
          [
            plant.name,
            plant.id,
            gpsLocation.latitude,
            gpsLocation.longitude,
            imageLocation,
            information,
          ]
        );
      },
      (err) => console.error("Error when saving data", err)
    );

    navigation.navigate("Herbarium");
  };

  const confirmDeleteEvent = () => {
    Alert.alert('Vahvista poisto', 'Haluatko varmasti poistaa tallennuksen', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteEvent()},
    ]);

  }

  const deleteEvent = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("DELETE FROM herbarium WHERE plant_id = ?;", [plant.id]);
      },
      (err) => console.error("Error when deleting data", err),
      () => {
        FileSystem.deleteAsync(event.image, { idempotent: true });
        setEvent(undefined);
      }
    );
  };

  return (
    <ScrollView style={styles.scrollViev}>
      <View style={styles.containerHeaderLink}>
        <Text style={styles.header}>{plant.name}</Text>
        {plant.external_id && (
          <Chip
            icon={{
              name: "info",
              type: "font-awesome",
              size: 15,
              color: "#F7E6C4",
            }}
            containerStyle={{ marginVertical: 2, marginRight: 100 }}
            onPress={() =>
              Linking.openURL(
                `https://luontoportti.com/t/${plant.external_id}/${plant.name}`
              )
            }
            color="#606C5D"
          />
        )}
      </View>

      <View style={styles.pictures}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}

        {event ? (
          <View style={styles.savedEvent}>
            <Text style={styles.information}>{event.information}</Text>
            <View style={styles.padding}>
              <Image
                source={{ uri: event.image }}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <View style={styles.padding}>
              <MapView
                style={{ width: 300, height: 200, paddingTop: 15 }}
                region={location}
              ></MapView>
            </View>
            <View style={styles.padding}>
              <Button
                title="Palaa kasvien listaukseen"
                onPress={() => navigation.navigate("Herbarium")}
                color="#606C5D"
              />
            </View>
            <View style={styles.padding}>
              <Button
                title="Poista tämä tallennus"
                onPress={() => confirmDeleteEvent()}
                color="#A25B5B"
              />
            </View>
          </View>
        ) : (
          <>
          <View style={{flexDirection: "row", justifyContent: "space-between", width: "85%"}}>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => pickImage()}
            >
              <Text>Valitse kuva galleriasta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={openCamera}
            >
              <Text>Ota kuva kameralla</Text>
            </TouchableOpacity>
            </View>
            <TextInput
              editable
              placeholder="Kuvaa kasvin ympäristöä ja omia kokemuksiasi kasvin löydöstä"
              multiline
              numberOfLines={4}
              maxLength={100}
              onChangeText={(text) => onChangeText(text)}
              value={information}
              style={{ padding: 10, marginBottom: 10, fontSize: 16 }}
              backgroundColor="#E4E4D0"
            
            />

            <MapView
              style={{ flex: 1, width: 200, height: 200 }}
              ref={mapRef}
              region={gpsLocation}
            ></MapView>

            <View style={styles.button}>
              <Button
                title="Paikanna"
                color="#F1C376"
                onPress={() => updateGpsPosition()}
              />
            </View>
            <View style={styles.button}>
              <Button title="Tallenna" color="#606C5D" onPress={saveData} />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
    textTransform: "capitalize",
  },
  containerHeaderLink: {
    backgroundColor: "#FFF4F4",
    flexDirection: "row",
    paddingLeft: 100,
    paddingTop: 20,
    paddingBottom: 30,
  },
  information: {
    backgroundColor: "#FFF4F4",
    paddingTop: 20,
    fontSize: 18,
  },
  pictures: {
    flex: 1,
    backgroundColor: "#FFF4F4",
    alignItems: "center",
  },
  padding: {
    paddingTop: 20,
  },
  button: {
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  TouchableOpacity: {
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#AEC3AE",
  },
  savedEvent: {
    alignItems: "center",
  },
  scrollViev: {
    flex: 1,
    backgroundColor: "#FFF4F4",
  },
});
