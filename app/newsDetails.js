import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import AppButton from "../components/AppButton";
import { addNews } from "../services/newsService";

export default function NewsDetails() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNews = async () => {
    if (!title || !content) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      console.log("🧠 Adding news:", { title, content });
      await addNews({ title, content });
      Alert.alert("Success", "News added successfully!");
      router.replace("/home");
    } catch (error) {
      console.error("❌ Add news failed:", error);
      Alert.alert("Error", error.message || "Failed to add news.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📰 Add News</Text>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Content"
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        multiline
      />

      <AppButton title="Save" onPress={handleAddNews} color="#007bff" />
      <AppButton
        title="Back to Home"
        onPress={() => router.replace("/home")}
        color="#6c757d"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
});
