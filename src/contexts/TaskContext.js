import React from 'react';
import { generateID, getFromLocalStorage, saveToLocalStorage } from '../utils';
import { STORE_KEY } from '../constants';

export const INITAL_STORE = [
  {
    id: generateID(),
    title: 'Backlog',
    tasks: [
      {
        id: generateID(),
        title: 'Dashboard Authentication',
        category: 'Frontend',
        description: 'Add private routes to the Admin dashboard.',
      },
    ],
  },
  {
    id: generateID(),
    title: 'In progress',
    tasks: [
      {
        id: generateID(),
        title: 'Add Authentication',
        category: 'Frontend',
        description: 'Create the Login flow and save User details to the DB.',
      },
    ],
  },
  {
    id: generateID(),
    title: 'Review',
    tasks: [
      {
        id: generateID(),
        title: 'Home Page Animations',
        category: 'Frontend',
        description: 'Add support for `prefers-reduced-motion` feature.',
      },
    ],
  },
  {
    id: generateID(),
    title: 'Completed',
    tasks: [
      {
        id: generateID(),
        title: 'Add Styling',
        category: 'Frontend',
        description: 'Create global styles and setup Styled Components.',
      },
      {
        id: generateID(),
        title: 'State Management',
        category: 'Architecture',
        description: 'Plan what goes into Contexts and Component heirarchy.',
      },
    ],
  },
];

export const getInitialTasks = () => {
  const initialTasks = getFromLocalStorage(STORE_KEY);
  if (initialTasks == null) return INITAL_STORE;
  return initialTasks;
};

export const TasksContext = React.createContext();

export const TasksProvider = ({ children }) => {
  const [store, rawSetStore] = React.useState(getInitialTasks);

  const setStore = (value) => {
    saveToLocalStorage(STORE_KEY, value);
    rawSetStore(value);
  };

  return (
    <TasksContext.Provider value={{ store, setStore }}>
      {children}
    </TasksContext.Provider>
  );
};
