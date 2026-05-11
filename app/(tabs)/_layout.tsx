import { Stack } from 'expo-router';
import React from 'react';

/**
 * The (tabs) group is kept for routing purposes but acts as a plain Stack
 * (no tab bar). The Landing screen lives at /(tabs)/index.
 */
export default function TabsLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
