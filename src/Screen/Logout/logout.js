// import React, { useContext } from "react";
// import { View, Text, TouchableOpacity } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import { AuthContext } from "../../Constants/AuthContext";
// import Icon from "react-native-vector-icons/Ionicons";
// const Logout = (props) => {
//   const navigation = useNavigation();
//   const { logout } = useContext(AuthContext);
//   const handleLogout = async () => {
//     await logout();
//   };
//   return (
//     <View style={{ marginTop: 30 }}>
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate("Login");
//         }}
//       >
//         <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
//           <View>
//             <Icon name="log-out-outline" color={"white"} size={33} />
//           </View>
//           <Text style={{ color: "white", marginLeft: 20 }}>Log Out</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Logout;
