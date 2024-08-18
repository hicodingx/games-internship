import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "../client/screens/home/Home";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import PlayScreen from "./screens/Play/PlayScreen";
import MemoApp from "./components/memoryGame/MemoApp/MemoApp";
import MorpionApp from "./components/morpionGame/morpionApp/MorpionApp";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />

          <Route path="play" element={<PlayScreen />} />
          <Route path="memo" element={<MemoApp />} />
          <Route path="morpion" element={<MorpionApp />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
