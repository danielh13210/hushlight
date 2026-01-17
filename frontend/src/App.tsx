import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Sidebar from "./components/Sidebar";
import Floorplan from "./components/Floorplan";
import lamps from "./data/test.json";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import GridLayout from "./layouts/GridLayout";
import Log from "./components/Log";
import initialLamps from "./data/test.json";
import { useState } from "react";

function App() {
  const [lamps, setLamps] = useState(initialLamps);
  const url = "http://10.203.103.170:5001";

  useEffect(() => {
    const fetchLamps = async () => {
      try {
        const res = await fetch(`${url}/devices/list`);
        if (!res.ok) {
          throw new Error("Failed to get lamps!");
        }
        const data = await res.json();
        setLamps(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLamps();
  }, []);

  return (
    <MainLayout>
      <Navbar />
      <GridLayout>
        <Floorplan lamps={lamps} setLamps={setLamps} />
        <Log />
        <Sidebar lamps={lamps} />
      </GridLayout>
    </MainLayout>
  );
}

export default App;
