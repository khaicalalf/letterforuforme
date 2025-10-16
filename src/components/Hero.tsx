import { useState } from "react";
import { submitLetter, getRandomLetter } from "../services/letterService";

const Hero = () => {
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState<null | "forMe" | "forYou">(null);
  const [randomLetter, setRandomLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const value = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    setLoading(true);
    try {
      await submitLetter(value);
      alert("Pesan berhasil dikirim! 🙌");
      setShowForm(false);
      setMode(null);
    } catch (error) {
      if (error instanceof Error) {
        alert("Tolong dijaga bahasanya ya 🙏");
        window.location.reload();
        console.error("Error insert:", error.message);
      } else {
        console.error("Error insert:", error);
      }
    }
  };

  const handleForMe = async () => {
    setLoading(true);
    try {
      const letter = await getRandomLetter();
      setRandomLetter(letter || "Belum ada pesan di database 😢");
      setMode("forMe");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetch:", error.message);
      } else {
        console.error("Error fetch:", error);
      }
    }
  };

  return (
    <div className="z-10 w-full m-4 p-4 md:max-w-2xl md:px-8 md:py-12 border bg-white backdrop-blur-lg rounded-xl shadow-xl text-center">
      {!showForm && !randomLetter && (
        <div>
          <h1 className="text-4xl italic md:text-6xl font-semibold text-gray-800 mb-6">
            Letter
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setMode("forYou");
                setShowForm(true);
              }}
              className="px-6 py-3 rounded-xl bg-gray-600 text-white font-semibold shadow-md hover:bg-gray-800 transition duration-300"
            >
              For You
            </button>
            <button
              onClick={handleForMe}
              disabled={loading}
              className="px-6 py-3 rounded-xl border-2 border-gray-600 text-gray-600 font-semibold hover:bg-gray-200 hover:text-gray-800 transition duration-300"
            >
              For Me
            </button>
          </div>
        </div>
      )}

      {showForm && mode === "forYou" && (
        <div>
          <h1 className="text-4xl italic md:text-4xl font-semibold text-gray-800 mb-6">
            Letter
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              name="message"
              placeholder="Tulis pesanmu..."
              className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-gray-500"
              required
            />
            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gray-600 text-white font-semibold shadow-md hover:bg-gray-800 transition duration-300"
              >
                Kirimkan ✈️
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setMode(null);
                  setLoading(false);
                }}
                className="px-6 py-3 rounded-xl border-2 border-gray-600 text-gray-600 font-semibold hover:bg-gray-200 hover:text-gray-800 transition duration-300"
              >
                Kembali
              </button>
            </div>
          </form>
        </div>
      )}

      {randomLetter && mode === "forMe" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-start w-full">
            <h1 className="text-lg italic md:text-2xl font-medium text-gray-800">
              Please Read The Letter
            </h1>
          </div>
          <p className="text-2xl text-gray-700 italic">"{randomLetter}"</p>
          <button
            onClick={() => {
              setRandomLetter(null);
              setMode(null);
              setLoading(false);
            }}
            className="px-6 py-3 rounded-xl border-2 border-gray-600 text-gray-600 font-semibold hover:bg-gray-200 hover:text-gray-800 transition duration-300"
          >
            Thank You 🫶
          </button>
        </div>
      )}
    </div>
  );
};

export default Hero;
