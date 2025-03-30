import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

export const NavButton = styled.button`
  padding: 0.75rem 1.5rem;
  margin: 0 0.5rem;
  border: none;
  background-color: ${({ active }) => (active ? '#4f46e5' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#4f46e5')};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? '#4338ca' : '#eef2ff')};
  }
`;