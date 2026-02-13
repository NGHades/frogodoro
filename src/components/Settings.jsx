import React, { useRef } from "react";

const Settings = ({
  showSettings,
  setShowSettings,
  selectedBackground,
  setSelectedBackground,
  backgrounds,
  addBackground,
}) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/gif")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newBackground = {
          id: Date.now(), // Simple ID generation
          name: file.name.split(".")[0], // Use filename without extension
          src: e.target.result,
        };
        addBackground(newBackground);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a JPEG or GIF file.");
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
      <div className="bg-black/75 border-4 border-gray-800 rounded-2xl p-8 max-w-4xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-3xl font-bold">Settings</h2>
          <button
            onClick={() => setShowSettings(false)}
            className="text-white hover:text-gray-300 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar flex-1">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl">Choose Background</h3>
              <button
                onClick={triggerFileUpload}
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 8L12 3L7 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 3V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Upload Background
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".jpeg,.jpg,.gif"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="grid grid-cols-2 gap-6">
              {backgrounds.map((bg) => (
                <div key={bg.id} className="flex flex-col items-center">
                  <div
                    className={`cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${
                      selectedBackground === bg.src
                        ? "border-white"
                        : "border-gray-600 hover:border-gray-400"
                    }`}
                    onClick={() => {
                      setSelectedBackground(bg.src);
                      setShowSettings(false);
                    }}
                  >
                    <img
                      src={bg.src}
                      alt={bg.name}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <div className="text-white text-center mt-3 text-lg">
                    {bg.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
