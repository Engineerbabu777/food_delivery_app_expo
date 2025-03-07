import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { AntDesign, Octicons } from "@expo/vector-icons";
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

  const openMaps = () => {
    const formattedAddress = encodeURIComponent(displayCurrentAddress);
    const url = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
    Linking.openURL(url);
  };

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
          padding: 10
        }}
      >
        <Pressable onPress={openMaps}>
          <Octicons name="location" size={24} color="#E52850" />
        </Pressable>
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
            alignItems: "center"
          }}
        >
          <Text>A</Text>
        </Pressable>
      </View>

      {/* INPUT! */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "#C0C0C0",
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 11,
          marginTop: 10,
          marginHorizontal: 10
        }}
      >
        <TextInput placeholder="Search for food, hotels" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
