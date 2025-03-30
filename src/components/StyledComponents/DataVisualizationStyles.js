import styled from 'styled-components';

export const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const ControlButton = styled.button`
  padding: 0.5rem 1rem;
  background: #e5e7eb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    background-color: #d1d5db;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ disabled }) => (disabled ? '#f3f4f6' : '#e5e7eb')};
  color: ${({ disabled }) => (disabled ? '#9ca3af' : 'inherit')};
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#f3f4f6' : '#d1d5db')};
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 200px;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const ColumnSelector = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const SelectLabel = styled.label`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

export const ErrorMessage = styled.div`
  padding: 0.75rem;
  background-color: #fee2e2;
  color: #dc2626;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

export const VisualizationPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
`;