// algorithms/tabuSearch.js
import calculateDistance from '../utils/distance.js';
import readData from '../utils/readdata.js';
import calculateWeight from '../utils/weigth.js';

const evaluateSolution = (solution, cafes, warehouses) => {
  let totalDistance = 0;

  for (const warehouse of warehouses) {
    let minDistance = Infinity;
    let selectedCafe = null;

    for (const cafe of cafes) {
      if (
        !solution.some(
          (wh) => wh.Latitud === cafe.Latitud && wh.Longitud === cafe.Longitud
        )
      ) {
        const distance = calculateDistance(
          warehouse.Latitud,
          warehouse.Longitud,
          cafe.Latitud,
          cafe.Longitud
        );
        if (distance < minDistance) {
          minDistance = distance;
          selectedCafe = cafe;
        }
      }
    }

    if (selectedCafe) {
      totalDistance += minDistance;
      selectedCafe.Personal--;
    }
  }

  return {
    distance: totalDistance,
  };
};

const generateRandomCoordinates = (cafes) => {
  const randomIndex = Math.floor(Math.random() * cafes.length);
  const cafe = cafes[randomIndex];

  return {
    Latitud: cafe.Latitud,
    Longitud: cafe.Longitud,
  };
};

const generateRandomWarehouses = (cafes, numWarehouses) => {
  const warehouses = [];

  while (warehouses.length < numWarehouses) {
    const warehouse = generateRandomCoordinates(cafes);

    if (
      !warehouses.some(
        (w) =>
          w.Latitud === warehouse.Latitud && w.Longitud === warehouse.Longitud
      )
    ) {
      warehouses.push(warehouse);
    }
  }

  return warehouses;
};

const generateNeighborhood = (solution) => {
  const neighborhood = [];

  for (let i = 0; i < solution.length - 1; i++) {
    for (let j = i + 1; j < solution.length; j++) {
      const newSolution = [...solution];
      newSolution[i] = solution[j];
      newSolution[j] = solution[i];
      neighborhood.push(newSolution);
    }
  }

  return neighborhood;
};

const runTabuSearch = async () => {
  console.log('Iniciando búsqueda tabú...');
  const cafes = await readData();

  // Configuración de la búsqueda tabú
  const maxIterations = 500;
  const numWarehouses = 10;
  const tabuListSize = 10;

  // Ordenar las cafeterías por peso de forma descendente
  cafes.sort((a, b) => b.Personal - a.Personal);

  // Generar almacenes iniciales de forma aleatoria
  const initialWarehouses = generateRandomWarehouses(cafes, numWarehouses);
  let bestSolution = [...initialWarehouses];
  let currentSolution = [...initialWarehouses];
  let bestEvaluation = evaluateSolution(bestSolution, cafes, bestSolution);
  let currentEvaluation = { ...bestEvaluation };
  const tabuList = [];

  // Bucle principal de la búsqueda tabú
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    if (iteration % 100 === 0) {
      console.log('Iteración', iteration);
    }
    let bestNeighbor = null;
    let bestNeighborEvaluation = null;

    const neighborhood = generateNeighborhood(currentSolution);

    // Evaluar la calidad de los vecinos y seleccionar el mejor vecino no tabú
    for (const neighbor of neighborhood) {
      const neighborEvaluation = evaluateSolution(neighbor, cafes, neighbor);

      if (
        !tabuList.some(
          (tabu) => JSON.stringify(tabu) === JSON.stringify(neighbor)
        ) &&
        (!bestNeighborEvaluation ||
          neighborEvaluation.distance < bestNeighborEvaluation.distance)
      ) {
        bestNeighbor = neighbor;
        bestNeighborEvaluation = neighborEvaluation;
      }
    }

    // Actualizar la mejor solución encontrada
    if (
      bestNeighborEvaluation &&
      bestNeighborEvaluation.distance < bestEvaluation.distance
    ) {
      bestSolution = bestNeighbor;
      bestEvaluation = bestNeighborEvaluation;
    }

    // Actualizar la solución actual y la lista tabú
    currentSolution = bestNeighbor;
    currentEvaluation = bestNeighborEvaluation;
    tabuList.push(bestNeighbor);
    if (tabuList.length > tabuListSize) {
      tabuList.shift();
    }
  }

  console.log('Mejor solución encontrada:', bestSolution);
  console.log('Evaluación de la mejor solución:', bestEvaluation);
  return bestSolution;
};

export default runTabuSearch;
