export default function Overlay({
  zIndex,
  onClick,
}: {
  zIndex: number;
  onClick: () => void;
}) {
  // Semi-transparent backdrop covering the entire viewport.
  return (
    <div
      // Clicking the overlay triggers the callback (e.g., closing a dialog).
      onClick={onClick}
      className={`fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-xs z-${zIndex}`}
    ></div>
  );
}
