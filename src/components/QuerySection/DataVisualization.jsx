import { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { FiDownload, FiAlertCircle } from 'react-icons/fi';
import * as S from '../StyledComponents/DataVisualizationStyles';


ChartJS.register(...registerables);

export function DataVisualizationControls({ 
  data, 
  columns, 
  onDownload, 
  onChartConfigChange,
  initialConfig = { type: 'bar', xAxis: '', yAxis: '' }
}) {
  const [chartConfig, setChartConfig] = useState(initialConfig);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  const handleChartSelect = (type) => {
    if (chartConfig.xAxis === chartConfig.yAxis) {
      setError('X and Y axes cannot be the same');
      return;
    }
    setError('');
    const newConfig = { ...chartConfig, type };
    setChartConfig(newConfig);
    onChartConfigChange(newConfig);
    setIsDropdownOpen(false);
  };

  const handleColumnChange = (axis, value) => {
    const newConfig = { ...chartConfig, [axis]: value };
    setChartConfig(newConfig);
    
    if (newConfig.xAxis === newConfig.yAxis) {
      setError('X and Y axes cannot be the same');
    } else {
      setError('');
      onChartConfigChange(newConfig);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <S.VisualizationPanel>
      <S.ControlsContainer>
        <S.ControlButton 
          onClick={onDownload}
          disabled={data.length === 0}
          aria-label="Download results as CSV"
        >
          <FiDownload size={16} />
          Download Table
        </S.ControlButton>
        
        <S.DropdownContainer>
          <S.DropdownButton 
            onClick={toggleDropdown}
            disabled={data.length === 0}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            Visualize ({chartConfig.type || 'select'})
          </S.DropdownButton>
          
          <S.DropdownMenu open={isDropdownOpen} aria-hidden={!isDropdownOpen}>
            <S.ColumnSelector>
              <S.SelectLabel htmlFor="x-axis-select">X-Axis Column</S.SelectLabel>
              <S.Select
                id="x-axis-select"
                value={chartConfig.xAxis}
                onChange={(e) => handleColumnChange('xAxis', e.target.value)}
                disabled={data.length === 0}
              >
                {columns.map(col => (
                  <option key={`x-${col}`} value={col}>{col}</option>
                ))}
              </S.Select>
              
              <S.SelectLabel htmlFor="y-axis-select">Y-Axis Column</S.SelectLabel>
              <S.Select
                id="y-axis-select"
                value={chartConfig.yAxis}
                onChange={(e) => handleColumnChange('yAxis', e.target.value)}
                disabled={data.length === 0}
              >
                {columns.map(col => (
                  <option key={`y-${col}`} value={col}>{col}</option>
                ))}
              </S.Select>
            </S.ColumnSelector>
            
            {error && (
              <S.ErrorMessage>
                <FiAlertCircle />
                {error}
              </S.ErrorMessage>
            )}
            
            <S.DropdownItem onClick={() => handleChartSelect('bar')}>
              Bar Graph
            </S.DropdownItem>
            <S.DropdownItem onClick={() => handleChartSelect('pie')}>
              Pie Chart
            </S.DropdownItem>
            <S.DropdownItem onClick={() => handleChartSelect('line')}>
              Line Graph
            </S.DropdownItem>
          </S.DropdownMenu>
        </S.DropdownContainer>
      </S.ControlsContainer>
      
      <DataVisualizationChart 
        chartType={chartConfig.type} 
        data={data} 
        columns={columns}
        xAxis={chartConfig.xAxis}
        yAxis={chartConfig.yAxis}
      />
    </S.VisualizationPanel>
  );
}

export function DataVisualizationChart({ chartType, data, columns, xAxis, yAxis }) {
  if (!data.length || !columns.length) {
    return (
      <S.ChartWrapper>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#6b7280'
        }}>
          No data available for visualization
        </div>
      </S.ChartWrapper>
    );
  }

  const effectiveXAxis = xAxis || columns[0];
  const effectiveYAxis = yAxis || (columns.length > 1 ? columns[1] : columns[0]);

  if (effectiveXAxis === effectiveYAxis) {
    return (
      <S.ChartWrapper>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#dc2626',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <FiAlertCircle size={24} />
          <div>X and Y axes cannot be the same</div>
        </div>
      </S.ChartWrapper>
    );
  }

  const labels = data.map(item => item[effectiveXAxis]);
  const values = data.map(item => {
    const value = item[effectiveYAxis];
    return typeof value === 'number' ? value : 
           typeof value === 'string' ? parseFloat(value) || 1 : 1;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: effectiveYAxis,
        data: values,
        backgroundColor: [
          'rgba(79, 70, 229, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(129, 140, 248, 0.7)',
          'rgba(165, 180, 252, 0.7)',
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(129, 140, 248, 1)',
          'rgba(165, 180, 252, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: chartType === 'pie' ? undefined : {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <S.ChartWrapper>
      {chartType === 'bar' && <Bar data={chartData} options={options} />}
      {chartType === 'pie' && <Pie data={chartData} options={options} />}
      {chartType === 'line' && <Line data={chartData} options={options} />}
    </S.ChartWrapper>
  );
}