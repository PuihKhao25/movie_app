import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootStack from "./navigators/RootStack";
import { AuthProvider } from "./src/Constants/AuthContext";
export default function App() {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}
