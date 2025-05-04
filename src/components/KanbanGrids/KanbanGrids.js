import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TasksContext } from '@contexts/TaskContext';
import { SnackbarContext } from '@contexts/SnackbarContext';
import TaskCard from '@components/TaskCard';

function KanbanGrids() {
  const { store, setStore } = React.useContext(TasksContext);
  const { showSnackbar } = React.useContext(SnackbarContext);
  const [data, setData] = React.useState(store);
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    setData(store);
  }, [store]);

  const showSnackbarMessage = (message) => {
    showSnackbar(message);
  };

  const onDragStart = () => {
    setIsDragging(true);
    document.body.classList.add('is-dragging');
  };

  const onDragEnd = (result) => {
    setIsDragging(false);
    document.body.classList.remove('is-dragging');
    const { source, destination } = result;
    if (!destination) return;

    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    const destColIndex = data.findIndex(
      (e) => e.id === destination.droppableId
    );

    if (sourceColIndex === -1 || destColIndex === -1) {
      console.error('Invalid column IDs:', { sourceColIndex, destColIndex });
      return;
    }

    const sourceCol = data[sourceColIndex];
    const destCol = data[destColIndex];
    const sourceTasks = [...sourceCol.tasks];
    const destTasks =
      sourceCol.id === destCol.id ? sourceTasks : [...destCol.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    const newData = [...data];
    newData[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
    newData[destColIndex] = { ...destCol, tasks: destTasks };

    setData(newData);
    setStore(newData);
    showSnackbarMessage(`Task "${movedTask.title}" moved to ${destCol.title}`);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <KanbanGridsWrapper isDragging={isDragging}>
        {data.map((column, colIndex) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided, snapshot) => (
              <KanbanColumnWrapper
                as={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: colIndex * 0.1 }}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                role='region'
                aria-label={`${column.title} column`}
              >
                <ColumnTitle>
                  {column.title} ({column.tasks.length})
                </ColumnTitle>
                {column.tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <DraggableWrapper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                        style={{
                          ...provided.draggableProps.style,
                          transform: snapshot.isDragging
                            ? `${provided.draggableProps.style?.transform} scale(1.05)`
                            : provided.draggableProps.style?.transform,
                        }}
                      >
                        <TaskCard
                          title={task.title}
                          category={task.category}
                          description={task.description}
                          id={task.id}
                          columnId={column.id}
                        />
                      </DraggableWrapper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </KanbanColumnWrapper>
            )}
          </Droppable>
        ))}
      </KanbanGridsWrapper>
    </DragDropContext>
  );
}

const KanbanGridsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: var(--spacing-md);
  width: 100%;
  overflow-x: hidden;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: var(--spacing-xl);
    padding: var(--spacing-lg);
  }
`;

const KanbanColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 280px;
  max-width: 320px;
  min-height: 400px;
  max-height: calc(100vh - 150px);
  background: var(--color-surface-frosted);
  border-radius: 12px;
  padding: var(--spacing-md);
  box-shadow: 0 4px 20px var(--color-shadow);
  border: 1px solid var(--color-border);
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ isDraggingOver }) =>
    isDraggingOver &&
    `
    background: var(--color-gray900);
    border-color: var(--color-accent);
    box-shadow: 0 0 8px var(--color-accent);
  `}

  @media screen and (min-width: 768px) {
    width: 300px;
  }
`;

const ColumnTitle = styled.h2`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  text-align: left;
`;

const DraggableWrapper = styled.div`
  margin-bottom: var(--spacing-sm);
  border-radius: 12px;
  ${({ isDragging }) =>
    isDragging &&
    `
    opacity: 1 !important;
    z-index: 1000 !important;
  `}
`;

export default KanbanGrids;
