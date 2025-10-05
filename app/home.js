import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { useCallback, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import { auth } from "../firebase/firebaseConfig";
import { deleteNews, getAllNews } from "../services/newsService";

export default function Home() {
  const [newsList, setNewsList] = useState([]);

  const fetchNews = async () => {
    try {
      const data = await getAllNews();
      setNewsList(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNews();
    }, [])
  );

  const handleDelete = async (id) => {
    try {
      await deleteNews(id);
      fetchNews();
      Alert.alert("Deleted", "News deleted successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to delete news.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Failed to log out.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Welcome to iNewsApp Home!</Text>

      <AppButton
        title="Add News"
        onPress={() => router.push("/newsDetails")}
        icon="add-circle"
        color="#28a745"
      />
      <AppButton
        title="Log Out"
        onPress={handleLogout}
        icon="exit"
        color="#ff3b30"
      />

      <FlatList
        data={newsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.newsContent}>
              {item.content}
            </Text>
            <View style={styles.buttonRow}>
              <AppButton
                title="🗑 Delete"
                onPress={() => handleDelete(item.id)}
                color="#dc3545"
              />
            </View>
          </View>
        )}
        contentContainerStyle={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  newsItem: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  newsTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  newsContent: { fontSize: 14, color: "#666", marginBottom: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "flex-end" },
});
