import { useState, useEffect } from 'react';
import './App.scss';
import Landingpage from './pages/Landingpage';

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:9898/api/entries')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return setEntries(data);
      })
      .catch((error) => console.error(error));
  };

  console.log({ entries });
  return <Landingpage entries={entries} fetchData={fetchData} />;
}

export default App;
