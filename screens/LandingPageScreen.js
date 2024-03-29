import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function LandingPageScreen() {

  const route = useRoute();
  
  // Extract user data from route params
  const user = route.params?.user || {};

  return (
    <View style={styles.container}>
      {user.uploadImage && (
        <Image
          style={styles.userImage}
          source={{ uri: user.uploadImage }}
          />
      )}
      <Text style={styles.welcomeText}>Welcome, {user.fullname}!</Text>
      <Text style={styles.userInfo}>Email: {user.email}</Text>
      <Text style={styles.userInfo}>Username: {user.username}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 5,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
  },
});