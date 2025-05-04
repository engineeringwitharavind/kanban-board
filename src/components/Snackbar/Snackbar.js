import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '@components/Button';

function Snackbar({ message, onUndo }) {
  return (
    <SnackbarWrapper
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Message>{message}</Message>
      <Button variant='secondary' onClick={onUndo}>
        Undo
      </Button>
    </SnackbarWrapper>
  );
}

const SnackbarWrapper = styled(motion.div)`
  position: fixed;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--color-surface-frosted);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: var(--spacing-md);
  box-shadow: 0 4px 12px var(--color-shadow);
  border: 1px solid var(--color-border);
`;

const Message = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
`;

export default Snackbar;
