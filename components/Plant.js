import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Chip } from "@rneui/themed";
import * as Linking from "expo-linking";
import * as ImagePicker from "expo-image-picker";


export default function Plant({route, navigation}) {
  const { plant } = route.params;
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

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

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  const [value, onChangeText] = React.useState(
    "Kuvaa kasvin ympäristöä ja omia kokemuksiasi kasvin löydöstä"
  );

  return (
    <View style={styles.main}>
      <View style={styles.containerHeaderLink}>
        <Text style={styles.header}>{plant.name}</Text>
        <Chip
          icon={{
            name: "info",
            type: "font-awesome",
            size: 15,
            color: "#F7E6C4",
          }}
          containerStyle={{ marginVertical: 2, marginRight: 100 }}
          onPress={() =>
            Linking.openURL(`https://luontoportti.com/t/${plant.external_id}/${plant.name}`)
          }
          color="#606C5D"
        />
      </View>

      <View style={styles.pictures}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}

        <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
          <Text>Valitse kuva galleriasta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text>Ota kuva kameralla</Text>
        </TouchableOpacity>

        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={100}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          style={{ padding: 10 }}
        />

        <Button title="Tallenna" color="#F1C376" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
  },
  containerHeaderLink: {
    flex: 1 / 4,
    backgroundColor: "#FFF4F4",
    flexDirection: "row",
    paddingLeft: 100,
    paddingTop: 20,
    paddingBottom: 30,
  },
  main: {
    flex: 1,
    backgroundColor: "#FFF4F4",
    paddingTop: 20,
  },
  pictures: {
    backgroundColor: "#FFF4F4",
    flex: 3,

    alignItems: "center",
  },
  textInput: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#AEC3AE",
    padding: 10,
    marginTop: 15,
  },
});
