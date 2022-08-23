import React from 'react';
import styled from 'styled-components';
import { TasksContext } from '@contexts/TaskContext';
import Modal from '@components/Modal';
import Button from '@components/Button';
import { COLORS } from '@constants';

function Header() {
  const { store, setStore } = React.useContext(TasksContext);

  const clearBoard = () => {
    store
      .map((column) => column.tasks)
      .map((task) => task.splice(0, task.length));
    const updatedStore = [...store];
    setStore(updatedStore);
  };

  return (
    <HeaderWrapper>
      <Title>Kanban Board</Title>
      <ButtonWrapper>
        <Button icon="Trash" background={COLORS.danger} onClick={clearBoard}>
          Reset Board
        </Button>
      </ButtonWrapper>
      <Modal />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h1`
  display: block;
  font-size: 1.3rem;
  color: ${COLORS.primary};
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export default Header;
