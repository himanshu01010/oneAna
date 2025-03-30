import * as S from '../StyledComponents/NavbarStyles';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <S.NavbarContainer>
      <S.NavButton
        active={activeTab === 'tryQuery'}
        onClick={() => setActiveTab('tryQuery')}
      >
        Try Query
      </S.NavButton>
      <S.NavButton
        active={activeTab === 'previousQuery'}
        onClick={() => setActiveTab('previousQuery')}
      >
        Previous Query
      </S.NavButton>
    </S.NavbarContainer>
  );
}

export default Navbar;