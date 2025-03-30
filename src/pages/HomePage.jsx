import { useState } from 'react';
import * as S from '../components/StyledComponents/HomePageStyles'; 
import Navbar from '../components/Navbar/Navbar';
import QuerySection from '../components/QuerySection/QueryInput';
import QueryHistory from '../components/QuerySection/QueryHistory';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('tryQuery');

  return (
    <S.PageContainer>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <S.ContentContainer>
        {activeTab === 'tryQuery' ? <QuerySection /> : <QueryHistory />}
      </S.ContentContainer>
    </S.PageContainer>
  );
}

export default HomePage;