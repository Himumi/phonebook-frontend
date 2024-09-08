export default function Display({ text, data, deleteFunc }) {
  return (
    <>
      <h2>{text}</h2>
      <ul>
        {data.map(d =>
          <li key={d.id}>
            <b>{d.name} {d.number}</b>
            <button onClick={deleteFunc(d.id)}>delete</button>
          </li>)}
      </ul>
    </>
  );
}