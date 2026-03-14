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
    settings: {
      pomodoroTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15,
      autoStartPomodoros: false,
      autoStartBreaks: false,
      background: "riverLandscape",
    },
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

    if (!userDoc.exists()) {
      console.error("User document does not exist");
      return;
    }

    const currentData = userDoc.data();

    // Initialize stats if they don't exist
    if (!currentData.stats) {
      console.log("Stats field missing, initializing...");
      await setDoc(
        userRef,
        {
          stats: {
            sessionsCompleted: 1,
            totalFocusTime: focusTime,
            totalBreakTime: breakTime,
            currentStreak: 1,
            longestStreak: 1,
            lastSessionDate: today,
          },
        },
        { merge: true },
      );
      console.log(
        `Stats initialized: +${focusTime}min focus, +${breakTime}min break`,
      );
      return;
    }

    const lastSessionDate = currentData.stats.lastSessionDate;
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
    console.log(
      `Stats updated: +${focusTime}min focus, +${breakTime}min break, ${isNewDay ? "streak +1" : "streak same day"}`,
    );
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

// Save user settings to Firestore
export const saveUserSettings = async (uid, settings) => {
  const userRef = doc(db, "users", uid);

  try {
    await setDoc(
      userRef,
      {
        settings: {
          pomodoroTime: settings.pomodoroTime,
          shortBreakTime: settings.shortBreakTime,
          longBreakTime: settings.longBreakTime,
          autoStartPomodoros: settings.autoStartPomodoros,
          autoStartBreaks: settings.autoStartBreaks,
          background: settings.background,
        },
      },
      { merge: true },
    );
    console.log("Settings saved successfully to Firestore");
  } catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }
};

// Load user settings from Firestore
export const loadUserSettings = async (uid) => {
  const docRef = doc(db, "users", uid);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().settings) {
      console.log("Settings loaded from Firestore:", docSnap.data().settings);
      return docSnap.data().settings;
    }
    console.log("No settings found in Firestore for user:", uid);
    return null;
  } catch (error) {
    console.error("Error loading settings from Firestore:", error);
    throw error;
  }
};
