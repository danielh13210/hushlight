import Lamp from "./Lamp";

function Floorplan(props: any) {
  return (
    <div className="flex justify-center items-center bg-gray-500 w-2/3">
      <div>Floorplan</div>
      <Lamp />
    </div>
  );
}

export default Floorplan;
