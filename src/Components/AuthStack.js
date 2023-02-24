import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screen/Login/Login';
import Signup from '../Screen/Signup/Signup';
const Stack = createNativeStackNavigator();
import ForgotPassword from '../Screen/Profile/ForgotPassword';
import ChangePassword from '../Screen/Profile/ChangePassword';

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};
