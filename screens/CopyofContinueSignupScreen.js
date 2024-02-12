// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   View,
//   Image,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function CopyofContinueSignupScreen({navigation}) {

//   // for inputfields
//   const [form, setForm] = useState({
//     username: '',
//     fullName: '',
//     uploadPicture: '',
//   });

//   // for error messages
//   const [errors, setErrors] = useState({
//     errUsername: '',
//     errFullName: '',
//     errUploadPicture: '',
//   });

//   const isFormValid = () => {

//     // Check if username is valid
//     const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
//     if (!form.username || !usernameRegex.test(form.username)) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         errUsername: 'Please enter a valid username.',
//       }));
//       return false;
//     }

//     // Check if full name is valid
//     const fullNameRegex = /^[a-zA-Z\s'-]+$/;
//     if (!form.fullName || !fullNameRegex.test(form.fullName)) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         errFullName: 'Please enter a valid full name.',
//       }));
//       return false;
//     }

//     // Check if the picture is uploaded
//     if (!form.uploadPicture) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         errUploadPicture: 'Please upload a picture.',
//       }));
//       return false;
//     }

//     // return true if all is correct
//     return true;
//   }

//   const handleImagePicker = async () => {
//     const options = {
//       mediaType: 'photo',
//       quality: 0.5,
//     };

//     try {
//       const result = await launchImageLibrary(options);

//       if (result && !result.didCancel) {
//         setForm({ ...form, uploadPicture: result.uri });
//       }
//     } catch (error) {
//       console.error('Error picking an image:', error);
//     }
//   };

//   const handleNextPress = async () => {
//     if (isFormValid()) {
//       try {

//         // stringfy to use save the image properly
//         const formString = JSON.stringify(form);
//         // Save user data to AsyncStorage
//         // await AsyncStorage.setItem('username', form.username);
//         // await AsyncStorage.setItem('fullName', form.fullName);
//         // await AsyncStorage.setItem('uploadPicture', form.uploadPicture);
//         await AsyncStorage.setItem('formData', formString);
//         console.log(JSON.stringify(formString));
//       } catch (error) {
//         Alert.alert('Error saving data to AsyncStorage', error.message);
//       }
  
//       // Proceed to the next step or perform any necessary action
//       navigation.navigate('Success Page');
//     } 
//   };

//   const handleSignIn = () => {
//     navigation.navigate('Login');
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       //Reset the forms when being focused in screen
//       setForm({ username: '', fullName: '', uploadPicture: ''})
//     }, [])
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#dbe4f1' }}>
    
//       {/* Keyboard behavior */}
//       <KeyboardAvoidingView behavior='height' style={{flex: 1}}>

//         {/* To scroll the forms even when typing */}
//         <ScrollView contentContainerStyle={{ flexGrow: 1}}>
//           <View style={styles.container}>
//             <View style={styles.header}>
//               <Image
//                 accessibilityLabel=""
//                 resizeMode="contain"
//                 style={styles.headerImg}
//                 source={{
//                   uri: 'https://www.datadynamix.com.ph/assets/images/datadynamixpng2.png',
//                 }} />

//               <Text style={styles.title}>
//                 Sign up to <Text style={{ color: '#ff2121' }}>MyApp</Text>
//               </Text>

//               <Text style={styles.subtitle}>
//                 Create an account now to have access to our service
//               </Text>
//             </View>

//             <View style={styles.form}>

//               {/* Username */}
//               <View style={styles.input}>
//                 <Text style={styles.inputLabel}>Username</Text>

//                 <TextInput
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   // keyboardType="email-address"
//                   onChangeText={username => setForm({ ...form, username })}
//                   placeholder="ex. johndoe"
//                   placeholderTextColor="#6b7280"
//                   style={styles.inputControl}
//                   value={form.username} />
//                 <Text style={styles.errorMessage}>{errors.errUsername}</Text>
//               </View>

//               {/* Full name */}
//               <View style={styles.input}>
//                 <Text style={styles.inputLabel}>Full name</Text>

//                 <TextInput
//                   autoCorrect={false}
//                   onChangeText={fullName => setForm({ ...form, fullName })}
//                   placeholder="ex. John Doe"
//                   placeholderTextColor="#6b7280"
//                   style={styles.inputControl}
//                   value={form.fullName} />
//                 <Text style={styles.errorMessage}>{errors.errFullName}</Text>
//               </View>

//               {/* Upload picture */}
//               <TouchableOpacity onPress={handleImagePicker}>
//                 <View style={styles.uploadBtn}>
//                   <Text style={styles.uploadBtnText}>Upload Picture</Text>
//                 </View>
//               </TouchableOpacity>

//               {/* Display selected image */}
//               {form.uploadPicture ? (
//                 <View style={styles.imageContainer}>
//                   <Image
//                     source={{ uri: form.uploadPicture }}
//                     style={styles.selectedImage}
//                   />
//                 </View>
//               ) : null}

//               {/* Continue button */}
//               <View style={styles.formAction}>
//                 <TouchableOpacity onPress={handleNextPress}>
//                   <View style={styles.btn}>
//                     <Text style={styles.btnText}>Create account</Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity
//                 onPress={handleSignIn}
//                 style={{ marginTop: 'auto' }}>
//                 <Text style={styles.formFooter}>
//                   Already have an account?{' '}
//                   <Text style={{ textDecorationLine: 'underline' }}>Sign In</Text>
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 24,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   title: {
//     fontSize: 27,
//     fontWeight: '700',
//     color: '#0080ff',
//     marginBottom: 6,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#929292',
//     textAlign: 'center',
//   },
//   // Error message
//   errorMessage: {
//     color: 'red',
//     fontSize: 12,
//     marginTop: 5,
//   },
//   /** Header */
//   header: {
//     marginVertical: 36,
//   },
//   headerImg: {
//     width: 80,
//     height: 80,
//     alignSelf: 'center',
//     marginBottom: 36,
//   },
//   /** Form */
//   form: {
//     marginBottom: 24,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   formAction: {
//     marginVertical: 24,
//   },
//   formFooter: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#222',
//     textAlign: 'center',
//     letterSpacing: 0.15,
//   },
//   /** Input */
//   input: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#222',
//     marginBottom: 8,
//   },
//   inputControl: {
//     height: 44,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#222',
//   },

//   // Image upload style
//   // Display selected image styles
//   imageContainer: {
//     alignItems: 'center',
//     marginVertical: 16,
//   },
//   selectedImage: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//   },
//   /** Button */
//   btn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderWidth: 1,
//     backgroundColor: '#0080ff',
//     borderColor: '#0080ff',
//     maxWidth: '50%',
//     alignSelf: 'flex-end',
//   },
//   btnText: {
//     fontSize: 18,
//     lineHeight: 26,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   // Upload picture 
//   uploadBtn: {
//     backgroundColor: '#ccc', // Gray background color
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   uploadBtnText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#222',
//   },
// });