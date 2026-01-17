import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Sidebar from "./components/Sidebar";
import Floorplan from "./components/Floorplan";
import initialLamps from "./data/test.json";
import { useState } from "react";

function App() {
  const [lamps, setLamps] = useState<any[]>(initialLamps as any[]);

  return (
    <MainLayout>
      <Sidebar lamps={lamps} />
      <Floorplan lamps={lamps} setLamps={setLamps} />
    </MainLayout>
  );
}

export default App;
