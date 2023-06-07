import Papa from 'papaparse';

const readData = async () => {
  const response = await fetch('/src/data/cafes.csv');
  const csvData = await response.text();

  const results = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    transform: (value) => (value.trim() === '' ? undefined : value),
    encoding: 'utf-8',
  }).data;

  //ahora solo tomares los datos que necesitos : Nombre de la Unidad Econ�mica, Latitud, Longitud, Descripcion estrato personal ocupado
  const data = results.map((item) => {
    return {
      Nombre: item['Nombre de la Unidad Econ�mica'],
      Latitud: item['Latitud'],
      Longitud: item['Longitud'],
      Personal: item['Descripcion estrato personal ocupado'],
    };
  });
  console.log(data[0]);
  return data;
};

export default readData;
