export default function AudioSection({ label }: { label: String }) {
  return (
    <span className="flex flex-col items-center mt-20">
      <p className="text-xl text-center">{label}</p>
      <hr className="w-4/5" />
    </span>
  );
}
