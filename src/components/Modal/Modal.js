import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { X } from 'react-feather';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { TasksContext } from '@contexts/TaskContext';
import { SnackbarContext } from '@contexts/SnackbarContext';
import Button from '@components/Button';
import ModalForm from './ModalForm';
import '@reach/dialog/styles.css';

function Modal() {
  const { store, setStore, editTask, openEditModal } =
    React.useContext(TasksContext);
  const { showSnackbar } = React.useContext(SnackbarContext);
  const [showModal, setShowModal] = React.useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    openEditModal(null); // Clear edit state
  };

  const getTaskData = (data) => {
    const isEdit = !!editTask;
    const updatedStore = store.map((column) => {
      if (isEdit && column.id === editTask.columnId) {
        return {
          ...column,
          tasks: column.tasks.map((task) =>
            task.id === editTask.id ? { ...task, ...data } : task
          ),
        };
      }
      if (!isEdit && column.title === 'Backlog') {
        return { ...column, tasks: [...column.tasks, data] };
      }
      return column;
    });
    setStore(updatedStore);
    showSnackbar(`Task "${data.title}" ${isEdit ? 'updated' : 'created'}`);
    setShowModal(false);
  };

  React.useEffect(() => {
    if (editTask) {
      setShowModal(true);
    }
  }, [editTask]);

  return (
    <>
      <Button
        onClick={openModal}
        icon='Plus'
        variant='primary'
        aria-label='Create new task'
      >
        Create
      </Button>
      <DialogOverlayWrapper
        isOpen={showModal}
        onDismiss={closeModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <DialogContentWrapper
          as={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          aria-labelledby='modal-title'
          contain='paint'
        >
          <DialogHeaderWrapper>
            <ModalTitle id='modal-title'>
              {editTask ? 'Edit Task' : 'Create Task'}
            </ModalTitle>
            <Button
              variant='secondary'
              onClick={closeModal}
              aria-label='Close task creation modal'
            >
              <X size={24} aria-hidden='true' />
            </Button>
          </DialogHeaderWrapper>
          <ModalForm
            submittedTaskData={getTaskData}
            onDismiss={closeModal}
            initialData={editTask}
          />
        </DialogContentWrapper>
      </DialogOverlayWrapper>
    </>
  );
}

const DialogOverlayWrapper = styled(motion(DialogOverlay))`
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsla(210, 30%, 8%, 0.5);
  backdrop-filter: blur(12px);
  min-height: 100vh;
  z-index: 1000;
`;

const DialogContentWrapper = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  background: var(--color-surface-frosted);
  border-radius: 12px;
  padding: var(--spacing-lg);
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 32px var(--color-shadow);
  border: 1px solid var(--color-border);
`;

const DialogHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

export default Modal;
