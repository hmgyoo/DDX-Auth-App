import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ContinueSignupScreen from './screens/ContinueSignupScreen';
import LandingPageScreen from './screens/LandingPageScreen';
import SuccessSignupScreen from './screens/SuccessSignupScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Sign Up" component={SignupScreen}/>
        <Stack.Screen name="Continue Sign Up" component={ContinueSignupScreen}/>
        <Stack.Screen name="Landing Page" component={LandingPageScreen}/>
        <Stack.Screen name="Success Page" component={SuccessSignupScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;