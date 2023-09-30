import {
  View,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  const showToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared!',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      25,
      50
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <ActivityIndicator size='large' />
    </SafeAreaView>
  );
};

export default Index;
