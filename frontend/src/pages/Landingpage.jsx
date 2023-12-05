import Form from '../components/Form';
import List from '../components/List';

function Landingpage({ entries, fetchData }) {
  return (
    <>
      <section className='landingpage'>
        <div className='content'>
          <h1>GÄSTEBUCH</h1>
          <Form fetchData={fetchData} />
          <List entries={entries} />
        </div>
      </section>
    </>
  );
}

export default Landingpage;
