import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../components/firebaseConfig";

// Create user profile in Firestore when they sign up
export const createUserProfile = async (uid, email) => {
  await setDoc(doc(db, "users", uid), {
    email,
    createdAt: new Date(),
    stats: {
      sessionsCompleted: 0,
      totalFocusTime: 0, // in minutes
      totalBreakTime: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastSessionDate: null,
    },
  });
};

// Get user stats from Firestore
export const getUserStats = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No user document found");
    return null;
  }
};

// Update stats when a session is completed
export const recordSessionCompletion = async (uid, focusTime, breakTime) => {
  const userRef = doc(db, "users", uid);
  const today = new Date().toLocaleDateString();

  try {
    const userDoc = await getDoc(userRef);
    const currentData = userDoc.data();
    const lastSessionDate = currentData.stats.lastSessionDate;

    // Check if it's a new day for streak tracking
    const isNewDay = lastSessionDate !== today;

    await updateDoc(userRef, {
      "stats.sessionsCompleted": increment(1),
      "stats.totalFocusTime": increment(focusTime),
      "stats.totalBreakTime": increment(breakTime),
      "stats.currentStreak": isNewDay
        ? increment(1)
        : currentData.stats.currentStreak,
      "stats.longestStreak": Math.max(
        currentData.stats.longestStreak,
        isNewDay
          ? currentData.stats.currentStreak + 1
          : currentData.stats.currentStreak,
      ),
      "stats.lastSessionDate": today,
    });
  } catch (error) {
    console.error("Error recording session:", error);
    throw error;
  }
};

// Add session to history
export const addSessionToHistory = async (uid, sessionData) => {
  const userRef = doc(db, "users", uid);

  try {
    await updateDoc(userRef, {
      sessionHistory: arrayUnion({
        ...sessionData,
        timestamp: new Date(),
      }),
    });
  } catch (error) {
    console.error("Error adding session to history:", error);
    throw error;
  }
};
