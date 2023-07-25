import { createDrawerNavigator } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";

import Settings from "@/screens/Settings";
import Contact from "./ContactStack";

const Drawer = createDrawerNavigator();

export default function DrawerMenu() {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#dedede", "#fff", "#fff"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <Drawer.Navigator
        initialRouteName="Contact"
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          overlayColor: "transparent",
          drawerStyle: {
            flex: 1,
            width: "60%",
            borderRightWidth: 0,
            backgroundColor: "transparent",
          },
          sceneContainerStyle: { backgroundColor: "transparent" },
        }}
      >
        <Drawer.Screen name="Contact" component={Contact} />
        <Drawer.Screen name="Setting" component={Settings} />
      </Drawer.Navigator>
    </LinearGradient>
  );
}
