import { useState, useEffect, useCallback } from 'react';
import { FiClock, FiSearch, FiX, FiTrash2 } from 'react-icons/fi';
import QueryResultTable from './QueryResultTable';
import { loadCsvData } from '../../utils/loadCsvData';
import { DataVisualizationControls } from './DataVisualization';
import * as S from '../StyledComponents/QueryHistoryStyles';


const QueryHistory = () => {
  const [selectedQueryId, setSelectedQueryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [queryHistory, setQueryHistory] = useState([]);
  const [chartConfig, setChartConfig] = useState({
    type: 'bar',
    xAxis: '',
    yAxis: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

 
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await loadCsvData();
        setCsvData(data);
        
        const savedHistory = JSON.parse(localStorage.getItem('queryHistory')) || [];
        setQueryHistory(savedHistory);
        
        if (savedHistory.length > 0) {
          setSelectedQueryId(savedHistory[0].id);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);


  const processQueryResults = useCallback((queryText) => {
    let data = [];
    let cols = [];
    
    if (queryText.includes('SELECT * FROM customers')) {
      data = [...csvData];
      cols = Object.keys(csvData[0] || {});
    } else if (queryText.includes('GROUP BY country')) {
      const countryCounts = {};
      csvData.forEach(customer => {
        countryCounts[customer.country] = (countryCounts[customer.country] || 0) + 1;
      });
      data = Object.keys(countryCounts).map(country => ({
        country,
        customer_count: countryCounts[country]
      }));
      cols = ['country', 'customer_count'];
    } else if (queryText.includes("country = 'Germany'")) {
      data = csvData.filter(customer => customer.country === 'Germany');
      cols = Object.keys(csvData[0] || {});
    } else {
      data = [...csvData];
      cols = Object.keys(csvData[0] || {});
    }
    
    return { data, cols };
  }, [csvData]);

 
  useEffect(() => {
    if (!selectedQueryId || csvData.length === 0) return;

    setIsLoading(true);
    
    const queryObj = queryHistory.find(q => q.id === selectedQueryId);
    if (!queryObj) return;

    const timer = setTimeout(() => {
      try {
        const { data, cols } = processQueryResults(queryObj.query);
        setResults(data);
        setColumns(cols);
        setChartConfig(prev => ({
          ...prev,
          xAxis: cols[0],
          yAxis: cols.length > 1 ? cols[1] : cols[0]
        }));
      } catch (error) {
        console.error('Error processing query:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedQueryId, csvData, queryHistory, processQueryResults]);


  const handleDownload = useCallback(() => {
    if (results.length === 0) return;
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + columns.join(",") + "\r\n" 
      + results.map(row => columns.map(col => row[col]).join(",")).join("\r\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "query_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [results, columns]);


  const handleDeleteQuery = useCallback((id, e) => {
    e.stopPropagation();
    const updatedHistory = queryHistory.filter(query => query.id !== id);
    setQueryHistory(updatedHistory);
    localStorage.setItem('queryHistory', JSON.stringify(updatedHistory));
    
    if (selectedQueryId === id) {
      setSelectedQueryId(updatedHistory[0]?.id || '');
      setResults([]);
      setColumns([]);
    }
  }, [queryHistory, selectedQueryId]);

  
  const filteredQueries = queryHistory.filter(query => 
    query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.query.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return (
    <S.QueryHistoryContainer>
      <S.SectionTitle>Query History</S.SectionTitle>
      
      <S.MainContent>
        <div>
          <S.SearchContainer>
            <S.SearchInput
              type="text"
              placeholder="Search queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search queries"
            />
            {searchTerm && (
              <S.ClearButton onClick={handleClearSearch} aria-label="Clear search">
                <FiX size={16} />
              </S.ClearButton>
            )}
            <S.SearchIcon size={18} aria-hidden="true" />
          </S.SearchContainer>
          
          {filteredQueries.length > 0 ? (
            <S.QueryListContainer>
              {filteredQueries.map(query => (
                <S.QueryItem
                  key={query.id}
                  active={selectedQueryId === query.id}
                  onClick={() => setSelectedQueryId(query.id)}
                  aria-selected={selectedQueryId === query.id}
                >
                  <S.DeleteButton 
                    onClick={(e) => handleDeleteQuery(query.id, e)}
                    aria-label={`Delete query ${query.name}`}
                  >
                    <FiTrash2 size={14} />
                  </S.DeleteButton>
                  <S.QueryHeader>
                    <S.QueryName title={query.name}>{query.name}</S.QueryName>
                    <S.QueryDate>
                      <FiClock size={12} aria-hidden="true" />
                      {new Date(query.timestamp).toLocaleString()}
                    </S.QueryDate>
                  </S.QueryHeader>
                  <S.QueryText title={query.query}>{query.query}</S.QueryText>
                </S.QueryItem>
              ))}
            </S.QueryListContainer>
          ) : (
            <S.NoQueriesMessage>
              {searchTerm ? 'No matching queries found' : 'No queries in history'}
            </S.NoQueriesMessage>
          )}
        </div>
        
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
    </S.QueryHistoryContainer>
  );
};

export default QueryHistory;