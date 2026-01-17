import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Sidebar from "./components/Sidebar";
import Floorplan from "./components/Floorplan";
import lamps from "./data/test.json";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import GridLayout from "./layouts/GridLayout";
import Log from "./components/Log";

function App() {
  const url = "";
  // const lamps = ["lamp1", "lamp2"];

  // useEffect(() => {
  //   fetch(url);
  // }, []);

  return (
    <MainLayout>
      <Navbar />
      <GridLayout>
        <Floorplan lamps={lamps} />
        <Log />
        <Sidebar lamps={lamps} />
      </GridLayout>
    </MainLayout>
  );
}

export default App;
