import { useState, useCallback } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TextStyle,
  Text,
  TextInputProps,
} from "react-native";

interface CustomInput extends TextInputProps {
  disabled?: string;
  label?: string;
}

export default function Input({
  onFocus,
  onBlur,
  disabled,
  label,
  placeholder,
  ...props
}: CustomInput) {
  const [isFocused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (event, focus) => {
      setFocused(focus);
      focus && onFocus?.(event);
      !focus && onBlur?.(event);
    },
    [setFocused, onFocus, onBlur]
  );

  const inputStyles = StyleSheet.flatten([
    {
      flex: 1,
      minHeight: 20,
      zIndex: 2,
      height: "100%",
      width: "100%",
      fontSize: 20,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 5,
      marginTop: 5,
    },
  ]) as TextStyle;

  return (
    <View style={{ flex: 0, margin: 12 }}>
      {label && <Text>{label}</Text>}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TextInput
          {...props}
          style={[inputStyles, props.style]}
          placeholder={placeholder || ""}
          editable={!disabled}
          onFocus={(event) => handleFocus(event, true)}
          onBlur={(event) => handleFocus(event, false)}
        />
      </View>
    </View>
  );
}
