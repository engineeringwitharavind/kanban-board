import styled from 'styled-components';
import Header from '@components/Header';
import KanbanGrids from '@components/KanbanGrids';

function App() {
  return (
    <Wrapper>
      <Header />
      <KanbanGrids />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  width: 100%;
  @media screen and (min-width: 768px) {
    padding: 16px 32px;
  }
  @media screen and (min-width: 1920px) {
    padding: 16px 32px;
    max-width: 1900px;
    min-height: 1300px;
    margin: 0 auto;
  }
`;

export default App;
