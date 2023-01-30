import React,{useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import {AuthStack} from '../src/Components/AuthStack';
import {AuthContext} from '../src/Constants/AuthContext';
import DrawerNavigator from "../src/Components/DrawerNaviagtor";
import DetailMovies from "../src/Screen/Movie/DetailMovies";
const Stack = createNativeStackNavigator();

const RootStack = () => {
  const {isLoading, userInfo} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {userInfo !== null ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          <Stack.Screen name="DetailMovies" component={DetailMovies} />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default RootStack;
