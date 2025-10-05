import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/**
 * Add a news item to Firestore.
 * @param {Object} news - The news data (title, content, createdAt, etc.)
 * @returns {Promise<Object>} - The saved news item including its ID.
 */
export const addNews = async (news) => {
  try {
    console.log("🟢 Attempting to add news:", news);

    // Add to Firestore
    const docRef = await addDoc(collection(db, "news"), {
      ...news,
      createdAt: new Date(),
    });

    console.log("✅ News saved successfully with ID:", docRef.id);
    return { id: docRef.id, ...news };

  } catch (error) {
    console.error("🔥 Firestore addNews error:", error);
    throw new Error("Failed to add news. Please try again.");
  }
};

/**
 * Fetch all news items.
 */
export const getAllNews = async () => {
  const snapshot = await getDocs(collection(db, "news"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Fetch a single news item by ID.
 */
export const getNewsById = async (id) => {
  const docRef = doc(db, "news", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id, ...docSnap.data() };
  else throw new Error("News not found");
};

/**
 * Delete a news item by ID.
 */
export const deleteNews = async (id) => {
  await deleteDoc(doc(db, "news", id));
  console.log("🗑️ News deleted:", id);
};

/**
 * Update an existing news item.
 */
export const updateNews = async (id, data) => {
  const docRef = doc(db, "news", id);
  await updateDoc(docRef, data);
  console.log("✏️ News updated:", id);
};
