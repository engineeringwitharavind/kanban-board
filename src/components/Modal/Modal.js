import React from 'react';
import styled from 'styled-components';
import { TasksContext } from '../../contexts/TaskContext';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import Button from '../Button';
import ModalForm from './ModalForm';
import { XSquare } from 'react-feather';
import { COLORS } from '../../constants';
import '@reach/dialog/styles.css';

function Modal() {
  const { store, setStore } = React.useContext(TasksContext);
  const [showModal, setShowModal] = React.useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const getTaskData = (data) => {
    const [backlog] = store.filter((column) => column.title === 'Backlog');
    backlog.tasks.push(data);
    const updateStore = [...store];
    setStore(updateStore);
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Button onClick={openModal} icon={'Plus'}>
        Create
      </Button>
      <DialogOverlayWrapper isOpen={showModal} onDismiss={closeModal}>
        <DialogContentWrapper aria-label="Task Form">
          <DialogHeaderWrapper>
            <ModalTitle>Create your Task</ModalTitle>
            <Button
              onClick={closeModal}
              background="none"
              color={`${COLORS.primary}`}
              padding="0"
            >
              <XSquare size={30} />
            </Button>
          </DialogHeaderWrapper>
          <ModalForm submittedTaskData={getTaskData} />
        </DialogContentWrapper>
      </DialogOverlayWrapper>
    </React.Fragment>
  );
}

const DialogOverlayWrapper = styled(DialogOverlay)`
  margin: 0 auto;
  backdrop-filter: blur(24px);
  background: rgba(0, 0, 0, 0.5);
  color: ${COLORS.black};
`;

const DialogContentWrapper = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 140px;
  padding: 16px;
  border-radius: 8px;
  min-width: 350px;
  @media screen and (min-width: 768px) {
    min-width: 500px;
  }
`;

const DialogHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ModalTitle = styled.h1`
  font-size: 1.3rem;
  color: ${COLORS.primary};
`;

export default Modal;
