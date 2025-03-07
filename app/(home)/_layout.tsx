import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

type Props = {};

const HomeRoot = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default HomeRoot;

const styles = StyleSheet.create({});
