import React from 'react';
import styled from 'styled-components';
import { TasksContext } from '../../contexts/TaskContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import TaskCard from '../TaskCard';
import { COLORS } from '../../constants';

function KanbanGrids() {
  const { store, setStore } = React.useContext(TasksContext);
  const [data, setData] = React.useState(store);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      setData(data);
      setStore(data);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <KanbanGridsWrapper>
        {data.map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided, snapshot) => (
              <KanbanColumnWrapper
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                style={{
                  ...provided.droppableProps.style,
                  background: snapshot.isDraggingOver
                    ? `${COLORS.muted}`
                    : `${COLORS.background}`,
                }}
              >
                <ColumnTitle>{column.title}</ColumnTitle>
                <React.Fragment>
                  {column.tasks &&
                    column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <DraggableDiv
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                            style={{
                              ...provided.draggableProps.style,
                              background: snapshot.isDragging
                                ? `${COLORS.decorative}`
                                : `${COLORS.white}`,
                            }}
                          >
                            <TaskCard
                              title={task.title}
                              category={task.category}
                              description={task.description}
                            />
                          </DraggableDiv>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </React.Fragment>
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
  justify-content: center;
  align-items: center;
  gap: 48px;
  padding: 16px 0;
  width: 100%;
  @media screen and (min-width: 768px) {
    display: block;
    column-count: 2;
  }
  @media screen and (min-width: 992px) {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  @media screen and (min-width: 1920px) {
    min-height: 1250px;
  }
`;

const ColumnTitle = styled.h1`
  font-size: 1rem;
  line-height: 1.8;
  color: ${COLORS.white};
`;

const KanbanColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-width: 320px;
  min-height: 470px;
  text-align: center;
  border: 2px solid ${COLORS.gray500};
  border-radius: 4px;
  overflow: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    width: 0;
  }
  @media screen and (min-width: 768px) {
    min-width: 250px;
    display: block;
    margin-bottom: 16px;
  }
  @media screen and (min-width: 992px) {
    min-width: 250px;
  }
  @media screen and (min-width: 1920px) {
    min-height: 1100px;
  }
`;

const DraggableDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 4px;
  width: 330px;
  padding: 8px 16px;
  margin: 8px auto;
  border-radius: 4px;
  color: ${COLORS.black};
  @media screen and (min-width: 992px) {
    min-width: 240px;
    width: 90%;
  }
`;

export default KanbanGrids;
