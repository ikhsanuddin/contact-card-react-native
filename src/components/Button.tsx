import { useCallback } from "react";
import {
  Platform,
  Pressable,
  Vibration,
  ViewStyle,
  StyleSheet,
  PressableProps,
} from "react-native";
import * as Haptics from "expo-haptics";

interface ButtonProps extends PressableProps {
  /**
   * id for testID & accesibilityLabel
   */
  id?: string;
  /**
   * Provides haptic feedback on touch - Haptics.selectionAsync()
   * @see https://docs.expo.io/versions/latest/sdk/haptics/
   */
  haptic?: boolean;
  /**
   * Adds vibration feedback on touch using Vibration.vibrate pattern
   * @see https://reactnative.dev/docs/vibration
   */
  vibrate?: number | number[] | null;
  /**
   * Repeat vibration pattern
   * @see https://reactnative.dev/docs/vibration
   */
  vibrateRepeat?: boolean;
  /**
   * Renders a View flex style
   * @see https://reactnative.dev/docs/flexbox#proptypes
   * @see https://reactnative.dev/docs/layout-props
   */
  rounded?: boolean;
  outline?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  style,
  id,
  onPress,
  haptic,
  vibrate,
  vibrateRepeat,
  rounded,
  outline,
  disabled,
  ...props
}: ButtonProps) {
  // generate component testID or accessibilityLabel based on Platform.OS
  const buttonID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  const handlePress = useCallback(
    (event: any) => {
      onPress?.(event);

      /* vibrate onPress */
      if (vibrate) {
        Vibration.vibrate(vibrate, vibrateRepeat);
      }

      /* haptic feedback onPress */
      if (haptic) {
        Haptics.selectionAsync();
      }
    },
    [haptic, vibrate, vibrateRepeat, onPress]
  );

  const buttonStyles = StyleSheet.flatten([
    {
      minHeight: 55,
      minWidth: 55,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      borderRadius: rounded ? 20 : 0,
      ...(typeof outline === "string" && {
        borderWidth: 2,
        borderColor: outline,
      }),
      ...(disabled && { opacity: 0.5 }),
    },
    style,
  ]) as ViewStyle;

  return (
    <Pressable
      {...props}
      {...buttonID}
      onPress={handlePress}
      style={({ pressed }) => [
        buttonStyles,
        pressed ? { opacity: 0.7 } : {},
      ]}
    >
      {children}
    </Pressable>
  );
}
