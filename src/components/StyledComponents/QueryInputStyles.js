import styled, { css } from 'styled-components';
import { FiSearch } from 'react-icons/fi';

export const QuerySectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  gap: 1.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
`;

export const QueryInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const QueryTextarea = styled.textarea`
  min-height: 300px;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  resize: vertical;
  margin-bottom: 1rem;
  flex-grow: 1;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const RunButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338ca;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const QueryNameInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ToggleLabel = styled.span`
  margin: 0 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  transition: color 0.2s;
  ${props => props.active && css`
    color: #4f46e5;
    font-weight: 500;
  `}
`;

export const ToggleWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;

  &:checked + .slider {
    background-color: #4f46e5;
  }

  &:checked + .slider:before {
    transform: translateX(30px);
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e7eb;
  transition: .4s;
  border-radius: 34px;
  overflow: hidden;

  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${({ showDummyQueries }) => showDummyQueries 
    ? css`
      &:before {
        content: "📊";
        font-size: 12px;
      }
    `
    : css`
      &:before {
        content: "</>";
        font-size: 12px;
      }
    `
  }
`;

export const QueriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  max-height: 300px;
  overflow-y: auto;
`;

export const QueryItem = styled.div`
  padding: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;

  &:hover {
    background-color: #e5e7eb;
  }
`;

export const QueryItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

export const QueryName = styled.strong`
  color: #374151;
`;

export const QueryTimestamp = styled.small`
  color: #6b7280;
  font-size: 0.75rem;
`;