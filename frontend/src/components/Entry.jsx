function Entry({ entry, fetchData }) {
  return (
    <article className='entry'>
      <div className='container'>
        <div className='user'>
          <p className='name'>{entry.name}</p>
          <p className='email'>{entry.email}</p>
        </div>
        <div className='text'>
          <p>
            schrieb am <span>{entry.date}</span>:
          </p>
        </div>
        <div className='message'>
          <p>{entry.message}</p>
        </div>
      </div>
    </article>
  );
}

export default Entry;
