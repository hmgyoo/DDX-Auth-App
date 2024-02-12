import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {

  // For email and password text field
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // for error messages
  const [errors, setErrors] = useState({
    errEmail: '',
    errPassword: '',
  });

  const isFormValid = () => {

    // Reset error messages
    setErrors({ errEmail: '', errPassword: ''});

    // Check if email is valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!form.email || !emailRegex.test(form.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        errEmail: 'Enter a valid email address.',
      }));
      return false;
    }

    // Check if password is valid 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()-_=+{};:,<.>]{8,}$/;
    if (
      !form.password ||
      form.password.length < 8 ||
      !passwordRegex.test(form.password)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        errPassword: 'Invalid password. Make sure it includes upper and lowercase letters, special characters, numbers, and is at least 8 characters long.',
      }));
    }

    // return true if all is correct
    // return true;
    return Object.values(errors).every((error) => !error);
  };

  const handleSignIn = () => {
    navigation.navigate('Sign Up');
  };

  const handleLogin = async () => {
    if (isFormValid()) {
      try {
        // Retrieve all keys from AsyncStorage
        const keys = await AsyncStorage.getAllKeys();
  
        // Retrieve all data corresponding to the keys
        const savedData = await AsyncStorage.multiGet(keys);
  
        // Log the retrieved data
        console.log('Saved Data:', savedData);
  
        // You can now perform any additional logic with the retrieved data
  
        // Retrieve the stored credentials
        const savedEmail = savedData.find(([key, value]) => key === 'email')?.[1];
        const savedPassword = savedData.find(([key, value]) => key === 'password')?.[1];
  
        // Check if the retrieved credentials are matching with the user input
        if (savedEmail === form.email && savedPassword === form.password) {
          // Navigate to landing page
          navigation.navigate('Landing Page');
        } else {
          Alert.alert('Login Failed', 'Invalid email or password');
        }
      } catch (error) {
        console.log('Error retrieving user credentials.', error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      //Reset the forms when being focused in screen
      setForm({ email: '', password: ''})
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#dbe4f1' }}>
      <KeyboardAvoidingView behavior='height' style={{flex: 1}}>
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                accessibilityLabel=''
                resizeMode="contain"
                style={styles.headerImg}
                source={{
                  uri: 'https://www.datadynamix.com.ph/assets/images/datadynamixpng2.png',
                }} />

              <Text style={styles.title}>
                Sign in to <Text style={{ color: '#ff2121' }}>MyApp</Text>
              </Text>

              <Text style={styles.subtitle}>
                Login to your account to use our services
              </Text>
            </View>

            {/* Email address */}
            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email address</Text>

                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  placeholder="john@example.com"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  onChangeText={(email) => {
                    setForm({...form, email});
                    setErrors({...errors, errEmail: ''});
                  }}
                  value={form.email} />
                <Text style={styles.errorMessage}>{errors.errEmail}</Text>
              </View>
              
              {/* Password */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>

                <TextInput
                  autoCorrect={false}
                  onChangeText={(password) => {
                    setForm({...form, password});
                    setErrors({...errors, errPassword: ''});
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.password} />
                <Text style={styles.errorMessage}>{errors.errPassword}</Text>
              </View>

              {/* Sign in Button */}
              <View style={styles.formAction}>
                <TouchableOpacity
                  onPress={handleLogin}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Sign in</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Navigatet to Sign Up Screen */}
              <TouchableOpacity
              // change screen
                onPress={handleSignIn}
                style={{ marginTop: 'auto' }}>
                <Text style={styles.formFooter}>
                  Still don't have an account?{' '}
                  <Text style={{ textDecorationLine: 'underline' }}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#0080ff',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  // Error message
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  /** Header */
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#0080ff',
    borderColor: '#0080ff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});