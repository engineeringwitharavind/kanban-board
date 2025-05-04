import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Edit, Trash } from 'react-feather';
import { TasksContext } from '@contexts/TaskContext';

const categoryColors = {
  Frontend: 'hsl(210, 80%, 60%)',
  Design: 'hsl(270, 70%, 60%)',
  Services: 'hsl(160, 70%, 40%)',
  Architecture: 'hsl(40, 70%, 45%)',
};

function TaskCard({ title, category, description, id, columnId, isDropped }) {
  const { setStore, openEditModal } = React.useContext(TasksContext);

  const handleDelete = () => {
    setStore((prevStore) =>
      prevStore.map((column) =>
        column.id === columnId
          ? { ...column, tasks: column.tasks.filter((task) => task.id !== id) }
          : column
      )
    );
  };

  return (
    <CardWrapper
      as={motion.div}
      initial={isDropped ? {} : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      whileHover={{ scale: 1.03 }}
      role='article'
      aria-labelledby={`task-${id}`}
      contain='paint'
    >
      <CardHeader>
        <Title id={`task-${id}`}>{title}</Title>
        <ActionButtons>
          <ActionButton
            onClick={() =>
              openEditModal({ id, title, category, description, columnId })
            }
            aria-label={`Edit task ${title}`}
          >
            <Edit size={16} aria-hidden='true' />
          </ActionButton>
          <ActionButton
            onClick={handleDelete}
            aria-label={`Delete task ${title}`}
          >
            <Trash size={16} aria-hidden='true' />
          </ActionButton>
        </ActionButtons>
      </CardHeader>
      <CategoryBadge category={category}>{category}</CategoryBadge>
      <Description>{description}</Description>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-surface-frosted);
  border-radius: 12px; /* Consistent with columns */
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  transform: translateZ(0);
  will-change: transform;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  opacity: 0;
  transition: opacity 0.2s ease;
  ${CardWrapper}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: 4px;
  &:hover {
    background: var(--color-gray900);
    color: var(--color-text-primary);
  }
  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`;

const CategoryBadge = styled.div`
  align-self: flex-start;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 6px;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
  background: ${({ category }) =>
    categoryColors[category] || 'var(--color-gray500)'};
`;

const Description = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
`;

export default TaskCard;
