import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Styles from "../Styles";
import Home from "../Screen/Home";
import { AuthContext } from "../Constants/AuthContext";
import Icon from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const { logout } = useContext(AuthContext);
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View style={{marginTop:30}}>
      <View style={Styles.sectionBg}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <TouchableOpacity style={styles.containerLogout} onPress={handleLogout}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View>
              <Icon name="log-out-outline" color={"white"} size={33} />
            </View>
            <Text style={{ color: "white", marginLeft: 20 }}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#151C26",
          elevation: 0,
          shadowOpacity: 0,
        },
        drawerInactiveTintColor: "white",
        headerTintColor: "white",
        headerTitle: "",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        component={Home}
        name="Home"
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="home" color={"white"} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  containerLogout: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 50,
    backgroundColor: "#151C26",
    padding: 20,
    marginTop:30
  },
});

export default DrawerNavigator;
