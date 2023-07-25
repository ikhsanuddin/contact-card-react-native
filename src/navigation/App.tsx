import React, { useEffect } from "react";
import { TranslationProvider } from "@/hooks/useTranslation";
import { ThemeProvider } from "@/hooks/useTheme";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

import DrawerMenu from "./Drawer";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const scheme = useColorScheme();

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return (
    <>
      <StatusBar />
      <TranslationProvider>
        {/* <ThemeProvider theme={DarkTheme} setTheme={setTheme}> */}
        <NavigationContainer
          theme={scheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <DrawerMenu />
        </NavigationContainer>
        {/* </ThemeProvider> */}
      </TranslationProvider>
    </>
  );
}
