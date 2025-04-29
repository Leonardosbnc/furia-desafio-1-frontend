export default function Button({ onClick, children }) {
  return (
    <button
      className="w-full border-1 border-black rounded-lg p-2 bg-black text-white hover:opacity-75 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
