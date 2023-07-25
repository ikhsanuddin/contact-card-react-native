import { Image, StyleSheet } from "react-native";

export function Avatar({ source, size = 55, style = undefined }) {
  return (
    <Image
      source={source}
      style={StyleSheet.flatten([
        {
          width: size,
          height: size,
          borderRadius: size,
          resizeMode: "cover",
        },
        style,
      ])}
    />
  );
}
