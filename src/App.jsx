import Timer from "./components/Timer";
import PlayButton from "./components/PlayButton";
import RefreshButton from "./components/RefreshButton";
import VolumeButton from "./components/VolumeButton";
import SettingsButton from "./components/SettingsButton";
import Settings from "./components/Settings";
import riverLandscape from "./assets/backgrounds/riverLandscape.jpg";
import koiPond from "./assets/backgrounds/koi-pond.gif";
import vivarium from "./assets/backgrounds/vivarium.gif";
import sunsetLake from "./assets/backgrounds/sunsetLake.gif";
import waterfall from "./assets/backgrounds/waterfall.gif";
import desert from "./assets/backgrounds/desert.gif";
import { useState, createContext, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { loadUserSettings } from "./services/firestoreService";

export const BackgroundContext = createContext();

function App() {
  const { currentUser } = useContext(AuthContext);

  // Load background from localStorage or use default
  const [background, setBackground] = useState(() => {
    const saved = localStorage.getItem("frogodoro-background");
    return saved || "riverLandscape";
  });

  // Save background to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("frogodoro-background", background);
  }, [background]);

  // Load settings from Firestore when user logs in, reset to defaults on logout
  useEffect(() => {
    if (currentUser) {
      // User logged in - load from Firestore
      loadUserSettings(currentUser.uid)
        .then((settings) => {
          if (settings && settings.background) {
            setBackground(settings.background);
          }
        })
        .catch((error) => console.error("Failed to load background:", error));
    } else {
      // User logged out - reset to default
      setBackground("riverLandscape");
    }
  }, [currentUser]);

  // Background definitions with metadata
  const backgroundsData = [
    {
      id: "riverLandscape",
      name: "River Landscape",
      description: "Peaceful river scene",
      image: riverLandscape,
    },
    {
      id: "koiPond",
      name: "Koi Pond",
      description: "Quaint Koi Pond",
      image: koiPond,
    },
    {
      id: "vivarium",
      name: "Vivarium",
      description: "Vivarium Room",
      image: vivarium,
    },
    {
      id: "sunsetLake",
      name: "Sunset Lake",
      description: "Countryside Orange Sunset",
      image: sunsetLake,
    },
    {
      id: "waterfall",
      name: "Waterfall",
      description: "Foggy Waterfall",
      image: waterfall,
    },
    {
      id: "desert",
      name: "Desert",
      description: "Cloudy Desert",
      image: desert,
    },
  ];

  // Map background IDs to actual imports for styling
  const backgrounds = {
    riverLandscape: riverLandscape,
    koiPond: koiPond,
    vivarium: vivarium,
    sunsetLake: sunsetLake,
    waterfall: waterfall,
    desert: desert,
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgrounds[background]})`,
  };

  return (
    <BackgroundContext.Provider
      value={{ background, setBackground, backgroundsData }}
    >
      <main>
        {/* Main Timer Section - Full Screen */}
        <div
          className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center gap-12 px-4"
          style={backgroundStyle}
        >
          <h1 className="flex flex-row text-7xl font-bold font-jersey drop-shadow-2xl">
            <div className="text-frogGreen bg-frogWhite rounded-l-2xl p-4">
              FROG
            </div>
            <div className="text-frogWhite bg-frogGreen rounded-r-2xl p-4">
              ODORO
            </div>
          </h1>
          <div className="bg-white/50 rounded-xl p-6 md:p-8 shadow-lg w-full max-w-md min-h-80 flex flex-col items-center justify-center gap-6">
            <Timer />
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="w-full bg-linear-to-b from-frogWhite)to-white py-16 font-jersey">
          <div className="max-w-4xl mx-auto px-8 space-y-12">
            {/* About Section */}
            <section className="text-center">
              <h2 className="text-4xl font-bold font-jersey text-frogGreen mb-6">
                About Frogodoro
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                The Frogodoro Technique is a time management method that uses
                focused work sessions followed by short breaks to maximize
                productivity. Work for 25 minutes, then take a 5-minute break.
                It's that simple!
              </p>
            </section>

            {/* How It Works */}
            <section>
              <h3 className="text-3xl font-bold font-jersey text-frogGreen text-center mb-8">
                How It Works
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="text-4xl mb-4">🍅</div>
                  <h4 className="text-xl font-bold text-frogGreen mb-3">
                    Focus Time
                  </h4>
                  <p className="text-gray-600">
                    Work intensely for 25 minutes on a single task without
                    interruptions.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="text-4xl mb-4">☕</div>
                  <h4 className="text-xl font-bold text-frogGreen mb-3">
                    Short Break
                  </h4>
                  <p className="text-gray-600">
                    Take a 5-minute break to rest and recharge between work
                    sessions.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="text-4xl mb-4">🏖️</div>
                  <h4 className="text-xl font-bold text-frogGreen mb-3">
                    Long Break
                  </h4>
                  <p className="text-gray-600">
                    After 4 pomodoros, take a longer 15-30 minute break to fully
                    rest.
                  </p>
                </div>
              </div>
            </section>

            {/* Benefits */}
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold font-jersey text-frogGreen text-center mb-8">
                Benefits
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-frogGreen text-xl">✓</span>
                    Improved focus and concentration
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-frogGreen text-xl">✓</span>
                    Better time management
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-frogGreen text-xl">✓</span>
                    Reduced mental fatigue
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-frogGreen text-xl">✓</span>
                    Increased productivity
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-frogGreen text-xl">✓</span>
                    Enhanced work-life balance
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-frogGreen text-xl">✓</span>
                    Better task tracking
                  </li>
                </ul>
              </div>
            </section>

            {/* Tips */}
            <section>
              <h3 className="text-3xl font-bold font-jersey text-frogGreen text-center mb-8">
                Pro Tips
              </h3>
              <div className="bg-frogGreen text-white rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold mb-3">
                      During Focus Time
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Turn off notifications</li>
                      <li>• Choose one specific task</li>
                      <li>• Keep a notepad for distracting thoughts</li>
                      <li>• Stay hydrated</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3">During Breaks</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Step away from your workspace</li>
                      <li>• Do light stretching or walking</li>
                      <li>• Avoid social media</li>
                      <li>• Practice deep breathing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </BackgroundContext.Provider>
  );
}

export default App;
