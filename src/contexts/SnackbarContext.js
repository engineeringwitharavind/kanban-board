import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '@components/Button';

export const SnackbarContext = React.createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = React.useState(null);

  const showSnackbar = (message, onUndo) => {
    setSnackbar({ message, onUndo });
    setTimeout(() => setSnackbar(null), 5000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && (
        <SnackbarWrapper
          as={motion.div}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Message>{snackbar.message}</Message>
          {snackbar.onUndo && (
            <Button
              variant='secondary'
              onClick={() => {
                snackbar.onUndo();
                setSnackbar(null);
              }}
              aria-label='Undo action'
            >
              Undo
            </Button>
          )}
        </SnackbarWrapper>
      )}
    </SnackbarContext.Provider>
  );
};

const SnackbarWrapper = styled.div`
  position: fixed;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-surface-frosted);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 16px var(--color-shadow);
  z-index: 2000;
`;

const Message = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
`;
