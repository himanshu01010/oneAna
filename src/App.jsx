import styled from 'styled-components';
import HomePage from './pages/HomePage';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const App = ()=> {
  return (
    <AppContainer>
      <HomePage />
    </AppContainer>
  );
}

export default App;