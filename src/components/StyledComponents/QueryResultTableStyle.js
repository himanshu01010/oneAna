import styled from 'styled-components';
import { FiLoader } from 'react-icons/fi';

export const TableContainer = styled.div`
  overflow-x: auto;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  max-height: 500px;
  overflow-y: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

export const TableHeader = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  background-color: #f3f4f6;
  border-bottom: 1px solid #d1d5db;
  position: sticky;
  top: 0;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const LoadingMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6b7280;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6b7280;
`;