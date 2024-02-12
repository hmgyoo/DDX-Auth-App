import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({navigation}) {

  // for text input
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    // save to user object
    user: {},
  });

  // for error messages
  const [errors, setErrors] = useState({
    errEmail: '',
    errPassword: '',
    errConfirmPassword: '',
  });

  // make the code more modular
  // ============================

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()-_=+{};:,<.>]{8,}$/;
    return password.length >= 8 && passwordRegex.test(password);
  };

  const handleEmailChange = (email) => {
    setForm({ ...form, email });

    if (!isEmailValid(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        errEmail: 'Enter a valid email address.',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, errEmail: '' }));
    }
  };

  const handlePasswordChange = (password) => {
    setForm({ ...form, password });

    if (!isPasswordValid(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        errPassword:
          'Invalid password. Make sure it includes upper and lowercase letters, special characters, numbers, and is at least 8 characters long.',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, errPassword: '' }));
    }
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setForm({ ...form, confirmPassword });

    if (form.password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        errConfirmPassword: 'Passwords do not match.',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, errConfirmPassword: '' }));
    }
  };

  // ============================

  const isFormValid = () => {

    // // Reset error messages
    // setErrors({ errEmail: '', errPassword: '', errConfirmPassword: '' });

    // // Check if email is valid
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // if (!form.email || !emailRegex.test(form.email)) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     errEmail: 'Enter a valid email address.',
    //   }));
    //   return false;
    // }

    // // Check if password is valid 
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()-_=+{};:,<.>]{8,}$/;
    // if (
    //   !form.password ||
    //   form.password.length < 8 ||
    //   !passwordRegex.test(form.password)
    // ) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     errPassword: 'Invalid password. Make sure it includes upper and lowercase letters, special characters, numbers, and is at least 8 characters long.',
    //   }));
    // }

    // // Check if password and confirm password is matching
    // if (form.password !== form.confirmPassword) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     errConfirmPassword: 'Passwords do not match.',
    //   }));
    //   return false;
    // }

    // // return true if all is correct
    // return true;

    return !errors.errEmail && !errors.errPassword && !errors.errConfirmPassword;
  } 

  const handleNextPress = async () => {
    if (isFormValid()) {
      // Proceed to the next step or perform any necessary action
      try {
        await AsyncStorage.setItem('email', form.email);
        await AsyncStorage.setItem('password', form.password);
        // Add user data to user object
        setForm((prevForm) => ({
          ...prevForm,
          user: {
            email: form.email,
            password: form.password,
          },
        }));
      } catch (error) {
        console.error('Error saving data to Async Storage:', error);
      }
      navigation.navigate('Continue Sign Up', { user: form.user});
    } 
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  useFocusEffect(
    React.useCallback(() => {
      //Reset the forms when being focused in screen
      setForm({ email: '', password: '', confirmPassword: '',});
      setErrors({ errEmail: '', 
                  errPassword: '', 
                  errConfirmPassword: '',});
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#dbe4f1' }}>

      {/* Keyboard behavior */}
      <KeyboardAvoidingView behavior='height' style={{flex: 1}}>

        {/* To scroll the forms even when typing */}
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                accessibilityLabel=""
                resizeMode="contain"
                style={styles.headerImg}
                source={{
                  uri: 'https://www.datadynamix.com.ph/assets/images/datadynamixpng2.png',
                }} />

              <Text style={styles.title}>
                Sign up to <Text style={{ color: '#ff2121' }}>MyApp</Text>
              </Text>

              <Text style={styles.subtitle}>
                Create an account now to have access to our service
              </Text>
            </View>

            <View style={styles.form}>

              {/* Email add */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email address</Text>

                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={handleEmailChange}
                  placeholder="ex. john@example.com"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.email} 
                />
                <Text style={styles.errorMessage}>{errors.errEmail}</Text>
              </View>

              {/* Password */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>

                <TextInput
                  autoCorrect={false}
                  onChangeText={handlePasswordChange}
                  placeholder="Enter your password"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.password} 
                />
                <Text style={styles.errorMessage}>{errors.errPassword}</Text>
              </View>

              {/* Confirm password */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Confirm password</Text>

                <TextInput
                  autoCorrect={false}
                  onChangeText={handleConfirmPasswordChange}
                  placeholder="Make sure that the passwords match"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.confirmPassword}   
                />
                <Text style={styles.errorMessage}>
                  {errors.errConfirmPassword}
                </Text>
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity
                  onPress={handleNextPress}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Next</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleSignIn}
                style={{ marginTop: 'auto' }}>
                <Text style={styles.formFooter}>
                  Already have an account?{' '}
                  <Text style={{ textDecorationLine: 'underline' }}>Sign In</Text>
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
    maxWidth: '50%',
    alignSelf: 'flex-end',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});