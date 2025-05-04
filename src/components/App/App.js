import React from 'react';
import styled from 'styled-components';
import { TasksProvider } from '@contexts/TaskContext';
import { SnackbarProvider } from '@contexts/SnackbarContext';
import GlobalStyles from '@components/App/GlobalStyles';
import Header from '@components/Header';
import KanbanGrids from '@components/KanbanGrids';

function App() {
  return (
    <TasksProvider>
      <SnackbarProvider>
        <GlobalStyles />
        <AppWrapper>
          <Header />
          <KanbanGrids />
        </AppWrapper>
      </SnackbarProvider>
    </TasksProvider>
  );
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  min-height: 100vh;
  padding: var(--spacing-md);
`;

export default App;
