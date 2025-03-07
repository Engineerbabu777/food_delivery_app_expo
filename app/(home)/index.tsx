import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {Octicons} from '@expo/vector-icons';
type Props = {};

const index = (props: Props) => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "fetching your location ..."
  );
  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    console.log({ status });

    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      let addressToDisplay;

      if (response?.[0]?.formattedAddress) {
        const addressToDisplay = `${response?.[0]?.formattedAddress
          .split(",")
          .slice(1, -1)}, ${response?.[0]?.isoCountryCode}`;

        setDisplayCurrentAddress(addressToDisplay);
      } else {
        addressToDisplay = `${response?.[0]?.streetNumber} ${response?.[0]?.street}, ${response?.[0]?.district}, ${response?.[0]?.city}, ${response?.[0]?.region}, ${response?.[0]?.isoCountryCode}`;
        setDisplayCurrentAddress(addressToDisplay);
      }
    }
  }

  

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          padding: 10,
        }}
      >
        <Octicons name="location" size={24} color="#E52850" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>Deliver To</Text>
          <Text style={{ color: "gray", fontSize: 16, marginTop: 3 }}>
            {displayCurrentAddress}
          </Text>
        </View>
        <Pressable
          style={{
            backgroundColor: "#6CB4EE",
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>A</Text>
        </Pressable>
      </View>
      </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
