import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TasksContext } from '@contexts/TaskContext';
import Modal from '@components/Modal';
import Button from '@components/Button';

function Header() {
  const { store, setStore } = React.useContext(TasksContext);

  const clearBoard = () => {
    const updatedStore = store.map((column) => ({
      ...column,
      tasks: [],
    }));
    setStore(updatedStore);
  };

  return (
    <HeaderWrapper
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      role='banner'
      aria-label='Kanban Board Header'
    >
      <Title>Kanban Board</Title>
      <ButtonWrapper>
        <Button
          icon='Trash'
          variant='danger'
          onClick={clearBoard}
          aria-label='Reset Kanban Board'
        >
          Reset Board
        </Button>
        <Modal />
      </ButtonWrapper>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-surface-frosted);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  box-shadow: 0 2px 10px var(--color-shadow);
  border: 1px solid var(--color-border);

  @media screen and (min-width: 768px) {
    padding: var(--spacing-lg);
  }
`;

const Title = styled.h1`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

export default Header;
