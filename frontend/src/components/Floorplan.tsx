import Lamp from "./Lamp";

function Floorplan(props: any) {
  return (
    <div className="flex justify-center items-center row-span-2 col-span-5 bg-[#2d2d2d]">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-[url('/floorplan.png')] bg-contain bg-no-repeat bg-center" />
        <Lamp />
      </div>
    </div>
  );
}

export default Floorplan;
