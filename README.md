# Excel Add-in Project

This is an Excel add-in built using the Office Add-ins platform with TypeScript and versifyJS (for Dependency Injection)

- **Controllers**: Handle the application flow and orchestrate between services
  - `TaskPaneController`: Manages the main taskpane UI and coordinates services

- **Services**:
  - `ExcelService`: Handles all Excel-related operations
  - `UIService`: Manages UI interactions and DOM manipulations
  - `DataTransformService`: Handles data transformations

## Technologies Used

- TypeScript
- Office.js
- InversifyJS (Dependency Injection)
- Webpack
- Babel

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run start
```
