import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SuccessSignupScreen({navigation}) {

  const handleLoginPress = () => {
    // back to login
    navigation.navigate('Login');
  }
  return (

    <View style={styles.container}>
      <Text>Success. You have created your account. Proceed to login.</Text>
      <TouchableOpacity onPress={handleLoginPress}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Back to Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0080ff',
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});