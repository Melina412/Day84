import Entry from './Entry';

function List({ entries, fetchData }) {
  return (
    <section className='list'>
      {entries?.map((entry, key) => (
        <Entry entry={entry} key={key} fetchData={fetchData} />
      ))}
    </section>
  );
}

export default List;
