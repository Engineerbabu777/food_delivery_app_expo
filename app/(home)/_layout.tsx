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
    </Stack>
  );
};

export default HomeRootLayout;
