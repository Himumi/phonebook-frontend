export default function Input({ text, onChange }) {
  return (
    <div>
      {text} : <input onChange={onChange} />
    </div>
  );
}