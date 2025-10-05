import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AppButton({
  title,
  onPress,
  icon,
  color = "#007bff",
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color, opacity: disabled ? 0.6 : 1 },
      ]}
      onPress={!disabled ? onPress : null}
      disabled={disabled}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
