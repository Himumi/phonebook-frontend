export default function Filter({ onFilter, filteredData }) {
  return (
    <>
      <div>
        filter shown with <input onChange={onFilter} />
      </div>
      <ul>
        {filteredData.map(d => <li key={d.id}>{d.name} {d.number}</li>)}
      </ul>
    </>
  );
}