import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";

type Props = {};

const index = (props: Props) => {
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "fetching your location ..."
  );

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Services not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServicesEnabled(true);
    }
  };

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
