type LampProps = {
  label: string; // e.g. "Lamp 1" or "L1"
  x: string;
  y: string;
  onMove: (id: string, x: string, y: string) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Extract digits from label (Lamp 12 -> 12). Fallback to label.
function getNumber(label: string) {
  const m = label.match(/\d+/);
  return m ? m[0] : label.replace(/^L/i, "");
}

function Lamp({ label, x, y, onMove }: LampProps) {
  const num = getNumber(label);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const el = e.currentTarget;
    const parent = el.parentElement;
    if (!parent) return;

    el.setPointerCapture(e.pointerId);
    const parentRect = parent.getBoundingClientRect();

    const onPointerMove = (ev: PointerEvent) => {
      const px = ev.clientX - parentRect.left;
      const py = ev.clientY - parentRect.top;

      const pctX = clamp((px / parentRect.width) * 100, 0, 100);
      const pctY = clamp((py / parentRect.height) * 100, 0, 100);

      onMove(label, `${pctX.toFixed(1)}%`, `${pctY.toFixed(1)}%`);
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing select-none"
      style={{ left: x, top: y, touchAction: "none" }}
      onPointerDown={handlePointerDown}
      title={label}
    >
      {/* Pin body */}
      <div className="relative w-12 h-12">
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-yellow-200/30 blur-md" />

        {/* Lamp head (bulb) */}
        <div className="absolute left-1/2 top-[6px] -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-100 border border-yellow-300 shadow" />

        {/* Lamp base */}
        <div className="absolute left-1/2 top-[34px] -translate-x-1/2 w-7 h-4 rounded-b-xl bg-gray-200 border border-gray-300 shadow-sm" />

        {/* Number badge */}
        <div className="absolute -right-1 -top-1 w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center border border-white shadow">
          {num}
        </div>
      </div>
    </div>
  );
}

export default Lamp;
