import React, { useEffect, useState } from 'react';
import runTabuSearch from './algorithms/tabusearch';
import Map from './components/Map';
import readData from './utils/readdata';
import { set } from 'lodash';

const App = () => {
  const [cafes, setCafes] = useState([]);
  const [iteration, setIteration] = useState(20);
  const [warehouses, setWarehouses] = useState([]);
  const [changing, setChanging] = useState(false);
  var iterations = iteration;

  useEffect(() => {
    const fetchData = async () => {
      const data = await readData();
      setCafes(data);
      setChanging(true);
      const warehouses = await runTabuSearch(iterations);
      setWarehouses(warehouses);
      setChanging(false);
    };

    fetchData();
  }, [iteration]);

  return (
    <div className="App pt-24">
      {changing ? (
        <div className="flex flex-col space-y-10 w-full h-full justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <a className="text-2xl font-bold text-gray-900">calculando</a>
        </div>
      ) : (
        <div>
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
              className="bg-gray-900 font-bold text-lg text-white rounded-md ml-2 p-2 hover:bg-gray-700"
              onClick={() => setIteration(iterations)}
            >
              Change Iterations
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
