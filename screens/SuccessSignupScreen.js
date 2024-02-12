import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessSignupScreen() {
  return (
    <View style={styles.container}>
      <Text>Success. You have created your account. Proceed to login.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});