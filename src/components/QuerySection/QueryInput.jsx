import { useState, useEffect } from 'react';
import { FiLoader } from 'react-icons/fi';
import QueryResultTable from './QueryResultTable';
import { loadCsvData } from '../../utils/loadCsvData';
import { dummyQueries } from '../../utils/dummyQueries';
import { DataVisualizationControls } from './DataVisualization';
import * as S from '../StyledComponents/QueryInputStyles';

const MAX_HISTORY_ITEMS = 100;

function QuerySection() {
  const [query, setQuery] = useState('SELECT * FROM customers;');
  const [queryName, setQueryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [chartConfig, setChartConfig] = useState({
    type: 'bar',
    xAxis: '',
    yAxis: ''
  });
  const [showDummyQueries, setShowDummyQueries] = useState(false);

  const saveQueryToHistory = (queryText, name) => {
    const newQuery = {
      id: `q${Date.now()}`,
      name: name || `Query ${new Date().toLocaleTimeString()}`,
      query: queryText,
      timestamp: new Date().toISOString()
    };

    const existingHistory = JSON.parse(localStorage.getItem('queryHistory')) || [];
    const updatedHistory = [newQuery, ...existingHistory].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem('queryHistory', JSON.stringify(updatedHistory));
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await loadCsvData();
      setCsvData(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleRunQuery = () => {
    if (!query.trim()) return;

    setIsLoading(true);
    
    saveQueryToHistory(query, queryName || undefined);
    setQueryName(''); 
    
    setTimeout(() => {
      let data = [];
      let cols = [];
      
      if (query.includes('SELECT * FROM customers')) {
        data = [...csvData];
        cols = Object.keys(csvData[0] || {});
      } else if (query.includes('GROUP BY country')) {
        const countryCounts = {};
        csvData.forEach(customer => {
          countryCounts[customer.country] = (countryCounts[customer.country] || 0) + 1;
        });
        data = Object.keys(countryCounts).map(country => ({
          country,
          customer_count: countryCounts[country]
        }));
        cols = ['country', 'customer_count'];
      } else if (query.includes("country = 'Germany'")) {
        data = csvData.filter(customer => customer.country === 'Germany');
        cols = Object.keys(csvData[0] || {});
      } else {
        data = [...csvData];
        cols = Object.keys(csvData[0] || {});
      }
      
      setResults(data);
      setColumns(cols);
      setChartConfig({
        type: 'bar',
        xAxis: cols[0],
        yAxis: cols.length > 1 ? cols[1] : cols[0]
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleDownload = () => {
    if (results.length === 0) return;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += columns.join(",") + "\r\n";
    results.forEach(row => {
      csvContent += columns.map(col => row[col]).join(",") + "\r\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "query_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleQuerySelect = (selectedQuery) => {
    setQuery(selectedQuery);
    setShowDummyQueries(false);
  };

  return (
    <S.QuerySectionContainer>
      <S.SectionTitle>Try Query</S.SectionTitle>
      
      <S.ToggleContainer>
        <S.ToggleLabel active={!showDummyQueries}>Editor</S.ToggleLabel>
        <S.ToggleWrapper>
          <S.ToggleInput 
            type="checkbox"
            id="queryToggle"
            checked={showDummyQueries}
            onChange={() => setShowDummyQueries(!showDummyQueries)}
          />
          <S.Slider 
            className="slider"
            showDummyQueries={showDummyQueries}
            onClick={() => setShowDummyQueries(!showDummyQueries)}
          />
        </S.ToggleWrapper>
        <S.ToggleLabel active={showDummyQueries}>List Of Queries</S.ToggleLabel>
      </S.ToggleContainer>

      <S.MainContent>
        <S.QueryInputContainer>
          <S.QueryNameInput
            type="text"
            placeholder="Name your query (optional)"
            value={queryName}
            onChange={(e) => setQueryName(e.target.value)}
          />
          
          {showDummyQueries ? (
            <S.QueriesList>
              {dummyQueries.map((item) => (
                <S.QueryItem key={item.id} onClick={() => handleQuerySelect(item.query)}>
                  <S.QueryItemHeader>
                    <S.QueryName>{item.name}</S.QueryName>
                    <S.QueryTimestamp>
                      {new Date(item.timestamp).toLocaleDateString()}
                    </S.QueryTimestamp>
                  </S.QueryItemHeader>
                  <div>{item.query}</div>
                </S.QueryItem>
              ))}
            </S.QueriesList>
          ) : (
            <>
              <S.QueryTextarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your SQL query here..."
              />
              <S.ButtonGroup>
                <S.RunButton onClick={handleRunQuery} disabled={isLoading || csvData.length === 0}>
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Running...
                    </>
                  ) : (
                    'Run Query'
                  )}
                </S.RunButton>
              </S.ButtonGroup>
            </>
          )}
        </S.QueryInputContainer>
        
        <DataVisualizationControls
          data={results}
          columns={columns}
          onDownload={handleDownload}
          onChartConfigChange={setChartConfig}
          initialConfig={chartConfig}
        />
      </S.MainContent>
      
      <QueryResultTable 
        data={results} 
        columns={columns} 
        isLoading={isLoading} 
      />
    </S.QuerySectionContainer>
  );
}

export default QuerySection;