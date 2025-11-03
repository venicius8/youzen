export default function AudioContainer({ src }: { src: string }) {
  return (
    <div
      className="w-3/4 max-w-3xl h-20 bg-linear-to-br from-cyan-400 to-blue-600 rounded-full my-6"
      style={{ boxShadow: "-2px 5px 10px rgba(0, 0, 0, 0.5)" }}
    ></div>
  );
}
