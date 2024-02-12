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
import ImagePicker from 'react-native-image-crop-picker';
import { useRoute } from '@react-navigation/native';

export default function SignupScreen({navigation}) {

  const route = useRoute();

  // for text input
  const [form, setForm] = useState({
    username: '',
    fullname: '',
    uploadImage: '',
    // extract user data from the route
    user: route.params?.user || {},
  });

  // for error messages
  const [errors, setErrors] = useState({
    errUsername: '',
    errFullname: '',
    errUploadImage: '',
  });

  const isFormValid = () => {

    // Reset error messages
    setErrors({ errUsername: '', errFullname: '', errUploadImage: '' });

    // Check if email is valid
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!form.username || !usernameRegex.test(form.username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        errUsername: 'Enter a valid username.',
      }));
      return false;
    }

    // Check if password is valid 
    const fullnameRegex = /^[a-zA-Z\s'-]+$/;
    if (!form.fullname || !fullnameRegex.test(form.fullname)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        errFullname: 'Enter a valud full name.',
      }));
    }

    // Check if image is uploaded

    // return true if all is correct
    return true;
  } 

  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setForm({ ...form, uploadImage: image.path });
      console.log(JSON.stringify(image.path))
    } catch (error) {
      console.error('Error picking an image:', error);
    }
  }

  const handleNextPress = async () => {
    if (isFormValid()) {
      try {
        await AsyncStorage.setItem('username', form.username);
        await AsyncStorage.setItem('fullname', form.fullname);
        await AsyncStorage.setItem('uploadImage', form.uploadImage);
        // add user data to the user object
        setForm((prevForm) => ({
          ...prevForm,
          user: {
            ...prevForm.user,
            username: form.username,
            fullname: form.fullname,
            uploadImage: form.uploadImage,
          }
        }));
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
      navigation.navigate('Success Page', { user: form.user });
    } 
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  useFocusEffect(
    React.useCallback(() => {
      //Reset the forms when being focused in screen
      setForm({ username: '', fullname: '', uploadImage: '',});
      setErrors({ errUsername: '', 
                  errFullname: '', 
                  errUploadImage: '',});
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

              {/* User name */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Username</Text>

                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={username => setForm({ ...form, username })}
                  placeholder="ex. testuser"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.username} 
                />
                <Text style={styles.errorMessage}>{errors.errUsername}</Text>
              </View>

              {/* Full name */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Full name</Text>

                <TextInput
                  autoCorrect={false}
                  onChangeText={fullname => setForm({ ...form, fullname })}
                  placeholder="ex. Test User"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.fullname} 
                />
                <Text style={styles.errorMessage}>{errors.errFullname}</Text>
              </View>

              {/* Upload picture */}
              <TouchableOpacity onPress={handleImagePicker}>
                <View style={styles.uploadBtn}>
                  <Text style={styles.uploadBtnText}>Upload Picture</Text>
                </View>
              </TouchableOpacity>

              {/* Preview selected picture */}
              <View style={styles.imageContainer}>
                {form.uploadImage ? (
                  <Image source={{ uri: form.uploadImage }} style={styles.selectedImage} />
                ) : null}
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity
                  onPress={handleNextPress}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Create Account</Text>
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
  // Upload img btn styles
  uploadBtn: {
    backgroundColor: '#ccc', // Gray background color
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  // Preview image style
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});