import React from "react";
import { Stack } from "expo-router";

type Props = {};

const HomeRootLayout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="hotel" />
      <Stack.Screen name="cart" />

    </Stack>
  );
};

export default HomeRootLayout;
