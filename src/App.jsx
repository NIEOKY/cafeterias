import React, { useEffect, useState } from 'react';
import runTabuSearch from './algorithms/tabusearch';
import Map from './components/Map';
import readData from './utils/readdata';

const App = () => {
  const [cafes, setCafes] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await readData();
      setCafes(data);
      const warehouses = await runTabuSearch();
      setWarehouses(warehouses);
    };

    fetchData();
  }, []);

  return (
    <div className="App pt-24">
      <Map cafes={cafes} warehouses={warehouses} />
    </div>
  );
};

export default App;
