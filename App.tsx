import React from 'react';
import AppLoading from 'expo-app-loading';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useLoad from './hooks/useLoad';

export default function App() {
  const { loading, error } = useLoad({
    images: [require('./assets/splash.png')],
    fonts: [Ionicons.font],
  });

  if (loading === false) return <AppLoading />;
  return (
    <View>
      <Text>{error || 'ready to start'}</Text>
    </View>
  );
}
