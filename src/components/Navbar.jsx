import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const { currentUser, logout } = useContext(AuthContext);

  if (!currentUser) {
    return null; // Only show navbar when logged in
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold text-green-500">Frogodoro</div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm">{currentUser.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
