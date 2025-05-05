### Kanban Board

This Kanban Board is a personal project to dive into micro-interactions using Framer Motion. It’s a simple tool to track tasks across columns like Backlog, In Progress, and Done, with a clean, intuitive interface. Built with React and Styled-Components, it features smooth drag-and-drop, task creation, editing, and deletion, snackbar notifications, and a dark mode UI with frosted glass, and Asul typography, optimized for performance and accessiblity.

### Features

- **Drag-and-Drop**: Reorder tasks across columns with GPU-accelerated animations and a subtle column glow
- **Task Management**: Create, edit, and delete tasks via a modal with form validation and category selection
- **Snackbar Notifications**: Bottom-right snackbars for notifying task creation, movement, and editing
- **Vibrant UI**: Frosted glass cards, and Asul font for a polished, modern aesthetic
- **Responsive Design**: Fully responsive layout for desktops, tablets, and mobiles
- **Accessibility**: ARIA labels, keyboard navigation, and high-contrast colours ensuring inclusivity
- **Performance**: Optimized with memoization, lazy loading, and CSS containment for fast load times

### Live Demo

Try out the live demo here: https://aravind-kanban-dnd.netlify.app/

### Screenshots

Kanban Board UI

![kanban-board](https://github.com/engineeringwitharavind/kanban-board/blob/main/public/assets/kanban-board-interface.png)

Task Creation Modal

![task-creation-modal](https://github.com/engineeringwitharavind/kanban-board/blob/main/public/assets/task-creation-modal.png)

![react](https://img.shields.io/badge/frontend-react-61dafb?style=flat&logo=React)
![styled-components](https://img.shields.io/badge/styling-styled--components-%23DB7093?style=flat&logo=styled-components)

### Setup

Clone the Repository using the below command

```shell
git clone https://github.com/engineeringwitharavind/kanban-board.git
```

Install dependencies

```shell
cd kanban-board
yarn
```

Run the Application

```shell
yarn start
```

The app will open at `http://localhost:3000`.

### Future Ideas

- Column Reordering: Enable drag-and-drop for reordering columns
- Theme Toggle: Add a dark/light mode toggle to experiment with SSR
- UI Customization: A color palette feature for UI customization

### Performance

![Lighthouse](https://github.com/engineeringwitharavind/kanban-board/blob/main/public/assets/kanban-board-lighthouse.PNG)
