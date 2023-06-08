import React, { useEffect, useState } from 'react';
import runTabuSearch from './algorithms/tabusearch';
import Map from './components/Map';
import readData from './utils/readdata';

const App = () => {
  const [cafes, setCafes] = useState([]);
  const [iteration, setIteration] = useState(20);
  const [warehouses, setWarehouses] = useState([]);
  var iterations = iteration;

  useEffect(() => {
    const fetchData = async () => {
      const data = await readData();
      setCafes(data);
      const warehouses = await runTabuSearch(iterations);
      setWarehouses(warehouses);
    };

    fetchData();
  }, [iteration]);

  return (
    <div className="App pt-24">
      <Map cafes={cafes} warehouses={warehouses} />
      {/*add a input and a button when user press button changes iteration to the input */}
      <div className="flex justify-center pt-10">
        <input
          className="border-2 border-gray-500 rounded-md"
          type="number"
          onChange={(e) => {
            iterations = e.target.value;
          }}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIteration(iterations)}
        >
          cambiar iteraciones
        </button>
      </div>
    </div>
  );
};

export default App;
