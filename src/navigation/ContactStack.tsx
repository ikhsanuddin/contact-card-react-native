import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet, Alert } from "react-native";

import {
  createStackNavigator,
  TransitionSpecs,
  TransitionPresets,
} from "@react-navigation/stack";
import { useDrawerStatus } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";

import Contact from "@/screens/Contact";
import ContactDetail from "@/screens/ContactDetail";

import { useTranslation } from "@/hooks/useTranslation";
import Button from "@/components/Button";
import IconBack from "@/components/icons/IconBack";
import IconMenu from "@/components/icons/IconMenu";
import IconAdd from "@/components/icons/IconAdd";
import ContactAddAndEdit from "@/screens/ContactAddAndEdit";
import IconDelete from "@/components/icons/iconDelete";
import contactAPI from "@/service/contactAPI";
import { ContactResponse } from "@/types/contactAPI";

type ContactStackNavigatorParamList = {
  ContactHome: undefined;
  ContactAdd: undefined;
  ContactEdit: ContactResponse;
  ContactDetail: ContactResponse;
};

const Stack = createStackNavigator<ContactStackNavigatorParamList>();

export default function ContactStack({ navigation }) {
  const { t } = useTranslation();

  const isDrawerOpen = useDrawerStatus() === "open";
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{ scale: scale }],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: "hidden",
          borderColor: "white",
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="ContactHome"
          component={Contact}
          options={{
            title: t("navigation.card"),
            headerLeft: () => (
              <Button
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              >
                <IconMenu isOpen={isDrawerOpen} />
              </Button>
            ),
            headerRight: () => (
              <Button onPress={() => navigation.navigate("ContactAdd")}>
                <IconAdd />
              </Button>
            ),
            transitionSpec: {
              open: TransitionSpecs.ScaleFromCenterAndroidSpec,
              close: TransitionSpecs.RevealFromBottomAndroidSpec,
            },
          }}
        />

        <Stack.Screen
          name="ContactDetail"
          component={ContactDetail}
          options={({ navigation, route }) => ({
            title: "",
            headerTransparent: true,
            headerStyle: {
              backgroundColor: "transparent",
              elevation: 0,
            },
            headerLeft: () => (
              <Button onPress={() => navigation.goBack()}>
                <IconBack />
              </Button>
            ),
            // headerShown: false,

            headerRight: () => (
              <Button
                onPress={() => {
                  const { firstName, lastName, id } = route.params;
                  Alert.alert(
                    "Delete this card",
                    `Delete "${firstName} ${lastName}"`,
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: async () => {
                          try {
                            await contactAPI.deleteContact(id);
                            navigation.goBack();
                          } catch (error) {
                            Alert.alert(t('error.deleteTitle'), error.message);
                          }
                        },
                        style: "default",
                      },
                    ],
                    {
                      cancelable: true,
                    }
                  );
                }}
              >
                <IconDelete />
              </Button>
            ),
            ...TransitionPresets.SlideFromRightIOS,
          })}
        />

        <Stack.Screen
          name="ContactAdd"
          component={ContactAddAndEdit}
          options={{
            title: t("navigation.cardAdd"),
            headerLeft: () => (
              <Button onPress={() => navigation.goBack()}>
                <IconBack />
              </Button>
            ),
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />

        <Stack.Screen
          name="ContactEdit"
          component={ContactAddAndEdit}
          options={{
            title: t("navigation.cardEdit"),
            headerLeft: () => (
              <Button onPress={() => navigation.goBack()}>
                <IconBack />
              </Button>
            ),
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      </Stack.Navigator>
    </Animated.View>
  );
}
