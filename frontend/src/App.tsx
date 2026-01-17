import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Sidebar from "./components/Sidebar";
import Floorplan from "./components/Floorplan";

function App() {
  const lamps = ["Lamp 1", "Lamp 2"];

  return (
    <MainLayout>
      <Sidebar lamps={lamps} />
      <Floorplan lamps={lamps} />
    </MainLayout>
  );
}

export default App;
