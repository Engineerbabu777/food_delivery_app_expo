import {
  Image,
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
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import Categories from "@/components/Categories";
import { hotels, items, recommended } from "@/data";
import Hotel from "@/components/Hotel";
type Props = {};

const index = (props: Props) => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "fetching your location ..."
  );
  const [data, setData] = useState([]);

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

      {/* categories */}
      <Categories />

      {/* Recommended Items! */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommended?.map((item, index) => (
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              margin: 10,
              borderRadius: 8
            }}
          >
            <View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "cover",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 7
                }}
                source={{ uri: item?.image }}
              />
            </View>
            <View style={{ padding: 10, flexDirection: "column" }}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginTop: 3,
                  color: "gray",
                  fontWeight: "500"
                }}
              >
                {item?.type}
              </Text>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Ionicons name="time" size={24} color="green" />
                <Text>{item?.time} mins</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Explore Items! */}
      <Text
        style={{
          textAlign: "center",
          marginTop: 7,
          letterSpacing: 4,
          marginBottom: 5,
          color: "gray"
        }}
      >
        EXPLORE
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items?.map((item, index) => (
          <View
            key={index}
            style={{
              width: 90,
              borderColor: "#E0E0E0",
              borderWidth: 1,
              paddingVertical: 5,
              paddingHorizontal: 1,
              borderRadius: 5,
              marginLeft: 10,
              marginVertical: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white"
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: item?.image }}
            />

            <Text style={{ fontSize: 13, fontWeight: "500", marginTop: 6 }}>
              {item?.name}
            </Text>

            <Text style={{ fontSize: 12, color: "gray", marginTop: 3 }}>
              {item?.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* ALl restaurants! */}
      <Text
        style={{
          textAlign: "center",
          marginTop: 7,
          letterSpacing: 4,
          marginBottom: 5,
          color: "gray"
        }}
      >
        ALL RESTAURANTS
      </Text>

      <View style={{ marginHorizontal: 8 }}>
        {hotels?.map((item, index) => (
          <Hotel key={index} item={item} menu={item?.menu} />
        ))}
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
