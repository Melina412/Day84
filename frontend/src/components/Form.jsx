import { useState } from 'react';
export default function Form({ fetchData }) {
  const [error, setError] = useState(null);
  const writeNewEntry = (e) => {
    e.preventDefault();

    // Datum erstellen und formatieren
    const new_date = new Date();
    let date = new_date.toLocaleDateString();

    const form = new FormData(e.target);

    // Datum als zum FormData-Objekt hinzufügen
    form.set('date', date);

    console.log(form.get('name'));
    console.log(form.get('lastname'));
    console.log(form.get('email'));
    console.log(form.get('message'));
    console.log(form.get('date'));

    fetch('http://localhost:9898/api/entries', {
      method: 'POST',
      body: form,
    }).then((res) => {
      if (res.ok) {
        console.log('gästebucheintrag wurde erstellt!');
        window.alert('Dein Gästebucheintrag wurde erfolgreich erstellt !!!!!!');
        fetchData();
        e.target.reset();
        setError(null);
      } else {
        res.json().then((data) => setError(data));
        // error handling hier
      }
    });
  };

  return (
    <section className='form'>
      <form onSubmit={writeNewEntry}>
        {/* error message erscheint wenn es einen error gibt */}
        {error && <div className='error-message'>{error.message}</div>}
        <div>
          <label htmlFor='name'>Vorname</label>
          <input type='text' id='name' name='name' />
        </div>
        <div>
          <label htmlFor='lastname'>Nachname</label>
          <input type='text' id='lastname' name='lastname' />
        </div>
        <div>
          <label htmlFor='email'>E-Mail</label>
          <input type='email' id='email' name='email' />
        </div>
        <div>
          <label htmlFor='message'>Nachricht</label>
          <input type='text' id='message' name='message' />
        </div>
        <input id='button' type='submit' value='Absenden' />
      </form>
    </section>
  );
}
