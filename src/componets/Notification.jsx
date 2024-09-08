export default function Notification({ text, classN }) {
  if (!text) return;

  return (
    <div className={classN}>
      {text}
    </div>
  );
}