import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

type Props = {};

const index = (props: Props) => {
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "fetching your location ..."
  );
  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      //   setErrorMsg('Permission to access location was denied')
      return;
    }
    console.log({ status });

    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;

      //provide lat and long to get the the actual address
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      let addressToDisplay;

      console.log({response})

    //   city , country , postalCode,

      if (response?.[0]?.formattedAddress) {
        const addressToDisplay = `${response?.[0]?.formattedAddress.split(",").slice(1, -1)}, ${response?.[0]?.isoCountryCode}`;

        setDisplayCurrentAddress(addressToDisplay);

      }else{

        addressToDisplay = `${response?.[0]?.streetNumber} ${response?.[0]?.street}, ${response?.[0]?.district}, ${response?.[0]?.city}, ${response?.[0]?.region}, ${response?.[0]?.isoCountryCode}`;
        setDisplayCurrentAddress(addressToDisplay)
      }

      //   }
      //   setDisplayCurrentAddress(responce[0]?.city)
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View>
      <Text>{displayCurrentAddress}</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
