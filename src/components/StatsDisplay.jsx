import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContextObject";
import { getUserStats } from "../services/firestoreService";

export default function StatsDisplay() {
  const { currentUser } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchStats = async () => {
      try {
        const userStats = await getUserStats(currentUser.uid);
        if (userStats) {
          setStats(userStats.stats);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentUser]);

  if (loading) {
    return <div className="text-center">Loading stats...</div>;
  }

  if (!stats) {
    return <div className="text-center">No stats yet</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <div className="text-3xl font-bold text-green-500">
          {stats.sessionsCompleted}
        </div>
        <div className="text-gray-600 text-sm">Sessions Completed</div>
      </div>

      <div className="text-center">
        <div className="text-3xl font-bold text-green-500">
          {stats.totalFocusTime}
        </div>
        <div className="text-gray-600 text-sm">Focus Minutes</div>
      </div>

      <div className="text-center">
        <div className="text-3xl font-bold text-green-500">
          {stats.currentStreak}
        </div>
        <div className="text-gray-600 text-sm">Current Streak</div>
      </div>

      <div className="text-center">
        <div className="text-3xl font-bold text-green-500">
          {stats.longestStreak}
        </div>
        <div className="text-gray-600 text-sm">Longest Streak</div>
      </div>
    </div>
  );
}
