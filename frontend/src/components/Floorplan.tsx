import Lamp from "./Lamp";

function Floorplan(props: any) {
  const handleMove = (uuid: string, x: string, y: string) => {
    props.setLamps((prev: any[]) =>
      prev.map((l: any) => (l.uuid === uuid ? { ...l, x, y } : l))
    );
  };

  return (
    <div className="w-2/3 bg-gray-500">
      <div className="relative w-full h-[90vh] overflow-hidden">
        <img
  src="/floorplan.png"
  alt="Library Floorplan"
  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
  draggable={false}
/>


        {props.lamps.map((l: any) => (
          <Lamp
            key={l.uuid}
            label={l.uuid}
            x={l.x || "50%"}   // fallback so it won't disappear
            y={l.y || "50%"}
            onMove={handleMove}
          />
        ))}
      </div>
    </div>
  );
}

export default Floorplan;
