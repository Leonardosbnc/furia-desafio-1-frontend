import Input from "./Input";

export default function FormField({ value, setValue, label, type }) {
  return (
    <div className="flex flex-col space-y-1">
      <span>{label}</span>
      <Input value={value} setValue={setValue} type={type} />
    </div>
  );
}
