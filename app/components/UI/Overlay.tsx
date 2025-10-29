export default function Overlay({
  zIndex,
  onClick,
}: {
  zIndex: number;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-xs z-${zIndex}`}
    ></div>
  );
}
