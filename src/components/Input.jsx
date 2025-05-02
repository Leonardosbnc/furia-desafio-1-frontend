export default function Input({ value, setValue, type = "text" }) {
  return (
    <input
      className="p-2 rounded-lg border-1 border-black shadow-xl"
      value={value}
      onChange={({ target: { value } }) => setValue(value)}
      type={type}
    />
  );
}
