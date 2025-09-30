import ChessBoardBackground from "./components/Chessboard";
import Hero from "./components/Hero";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden justify-center items-center relative">
        <ChessBoardBackground />
        <Hero />
      </div>
    </>
  );
}

export default App;
