import React, { useState, useMemo } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '@utils';
import { STORE_KEY } from '@constants';

export const INITIAL_STORE = [
  {
    id: 'column-backlog',
    title: 'Backlog',
    tasks: [
      {
        id: 'task-backlog-1',
        title: 'Design Dashboard UI',
        category: 'Design',
        description: 'Create wireframes and mockups for the admin dashboard.',
      },
    ],
  },
  {
    id: 'column-in-progress',
    title: 'In progress',
    tasks: [
      {
        id: 'task-in-progress-1',
        title: 'Implement Auth',
        category: 'Frontend',
        description: 'Add login flow with JWT and private routes.',
      },
    ],
  },
  {
    id: 'column-review',
    title: 'Review',
    tasks: [
      {
        id: 'task-review-1',
        title: 'API Integration',
        category: 'Services',
        description: 'Connect frontend to backend APIs with error handling.',
      },
    ],
  },
  {
    id: 'column-completed',
    title: 'Completed',
    tasks: [
      {
        id: 'task-completed-1',
        title: 'Database Schema',
        category: 'Architecture',
        description: 'Design and optimize database schema for scalability.',
      },
    ],
  },
];

export const getInitialTasks = () => {
  let initialTasks;
  try {
    initialTasks = getFromLocalStorage(STORE_KEY);
  } catch (error) {
    console.error('Error reading localStorage:', error);
    return INITIAL_STORE;
  }

  // Ensure initialTasks is a non-empty array of non-null objects
  if (
    !initialTasks ||
    !Array.isArray(initialTasks) ||
    initialTasks.length === 0 ||
    initialTasks.some((column) => !column || typeof column !== 'object')
  ) {
    console.warn(
      'Invalid localStorage data, using INITIAL_STORE:',
      initialTasks
    );
    return INITIAL_STORE;
  }

  const isValid = initialTasks.every(
    (column) =>
      column.id &&
      column.title &&
      Array.isArray(column.tasks) &&
      column.tasks.every(
        (task) => task.id && task.title && task.category && task.description
      )
  );

  if (!isValid) {
    console.warn(
      'LocalStorage data validation failed, using INITIAL_STORE:',
      initialTasks
    );
    return INITIAL_STORE;
  }

  return initialTasks;
};

export const TasksContext = React.createContext();

export const TasksProvider = ({ children }) => {
  const [store, setStoreRaw] = useState(getInitialTasks);
  const [prevStore, setPrevStore] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const openEditModal = (task) => {
    setEditTask(task);
  };

  const contextValue = useMemo(() => {
    const setStore = (value) => {
      setPrevStore(store);
      try {
        saveToLocalStorage(STORE_KEY, value);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      setStoreRaw(value);
    };

    return {
      store,
      setStore,
      prevStore,
      undo: () => prevStore && setStore(prevStore),
      editTask,
      openEditModal,
    };
  }, [store, prevStore, editTask]);

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};
