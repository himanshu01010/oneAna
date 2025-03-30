import Papa from 'papaparse';

export const loadCsvData = async () => {
  try {
    const response = await fetch('/data/customers.csv');
    const csvText = await response.text();
    
    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const processedData = results.data.map(row => {
            const processedRow = {};
            for (const key in row) {
              processedRow[key] = row[key] === '' || row[key] === 'NULL' ? null : row[key];
            }
            return processedRow;
          }).filter(row => Object.keys(row).length > 0); 
          resolve(processedData);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          resolve([]);
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV data:', error);
    return [];
  }
};