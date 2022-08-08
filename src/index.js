import React from 'react';
import { createRoot } from 'react-dom/client';
import { StyleSheetManager } from 'styled-components';
import App from './components/App';
import GlobalStyles from './components/App/GlobalStyles';
import { TasksProvider } from './contexts/TaskContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StyleSheetManager disableVendorPrefixes>
    <React.Fragment>
      <TasksProvider>
        <GlobalStyles />
        <App />
      </TasksProvider>
    </React.Fragment>
  </StyleSheetManager>
);
